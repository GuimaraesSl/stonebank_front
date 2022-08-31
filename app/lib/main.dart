import 'dart:io';
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/cupertino.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import 'features/notification/notification.dart';
import 'package:path_provider/path_provider.dart';
import 'package:fitbank_450/download_progress_dialog.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

const primaryColor = Color(0xFF323751);

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await setupNotificationListeners();

  SystemChrome.setSystemUIOverlayStyle(
    SystemUiOverlayStyle(
      statusBarBrightness: Brightness.dark,
    ),
  );
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FitBank 450',
      theme: ThemeData(
        brightness: Brightness.dark,
        platform: TargetPlatform.iOS,
      ),
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      onGenerateRoute: (settings) {
        return CupertinoPageRoute(
          builder: (context) => Home(),
        );
      },
    );
  }
}

class Home extends StatefulWidget {
  Home({Key? key}) : super(key: key);
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final _initialUrl = 'https://osbmobile.fitbank.com.br';
  InAppWebViewController? _webViewController;
  String? _downloadTaskId;

  @override
  void initState() {
    super.initState();

    _requestPermissions();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () => _onWillPop(context),
      child: Scaffold(
        backgroundColor: primaryColor,
        body: SafeArea(
          child: InAppWebView(
            initialUrlRequest: URLRequest(url: Uri.parse(_initialUrl)),
            onWebViewCreated: (controller) async {
              _webViewController = controller;
              controller.addJavaScriptHandler(
                handlerName: 'onDownloadTransactionReceipt',
                callback: _handleFileDownload,
              );
              controller.addJavaScriptHandler(
                handlerName: 'onShareTransactionReceipt',
                callback: _handleFileShare,
              );
              controller.addJavaScriptHandler(
                handlerName: 'onOpenExternalLink',
                callback: _handleOpenExternalLink,
              );
              controller.addJavaScriptHandler(
                handlerName: 'onRegisterDevice',
                callback: _handleRegisterDevice,
              );
            },
            initialOptions: InAppWebViewGroupOptions(
              crossPlatform: InAppWebViewOptions(
                useOnDownloadStart: true,
                supportZoom: false,
              ),
              android: AndroidInAppWebViewOptions(
                useHybridComposition: true,
              ),
              ios: IOSInAppWebViewOptions(
                allowsInlineMediaPlayback: true,
              ),
            ),
            androidOnPermissionRequest: _onRequestAndroidPermissions,
          ),
        ),
      ),
    );
  }

  Future<bool> _onWillPop(BuildContext context) async {
    final canGoBack = await _webViewController?.canGoBack() ?? false;
    if (canGoBack) {
      await _webViewController?.goBack();
      return false;
    }
    final willPop = await showDialog(
      context: context,
      builder: (context) {
        final buttonStyle = Theme.of(context).textTheme.button?.copyWith(
              color: Theme.of(context).brightness == Brightness.dark
                  ? Colors.white
                  : primaryColor,
            );
        return AlertDialog(
          title: Text('Sair do app'),
          content: Text('Deseja mesmo sair do app?'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(false);
              },
              child: Text('NÃO', style: buttonStyle),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(true);
              },
              child: Text('SIM', style: buttonStyle),
            )
          ],
        );
      },
    );
    return willPop ?? false;
  }

  Future<PermissionRequestResponse?> _onRequestAndroidPermissions(
    InAppWebViewController controller,
    String origin,
    List<String> resources,
  ) async {
    return PermissionRequestResponse(
      resources: resources,
      action: PermissionRequestResponseAction.GRANT,
    );
  }

  Future<T?> _showAlertDialog<T>(
    BuildContext context,
    String title,
    Widget content,
  ) {
    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(title),
          content: content,
          actions: [
            TextButton(
              child: Text("Fechar"),
              onPressed: () {
                Navigator.of(context).pop(true);
              },
            ),
          ],
        );
      },
    );
  }

  Future _requestPermissions() async {
    await Permission.camera.request();
    await Permission.microphone.request();
    await Permission.storage.request();
  }

  Future<bool> _checkPermission() async {
    PermissionStatus permission = await Permission.storage.request();
    return permission.isGranted;
  }

  Future<String?> _getDownloadDirectory({String? fileName}) async {
    String? dir = (Platform.isAndroid
            ? await getExternalStorageDirectory()
            : await getApplicationDocumentsDirectory())!
        .path;
    if (fileName != null) dir = '$dir${Platform.pathSeparator}$fileName';
    return dir;
  }

  Future<void> _canDownload() async {
    final permissionGranted = await _checkPermission();
    if (!permissionGranted) {
      _showAlertDialog(
        context,
        "Permissão para download negada",
        Text("Aceite para continuar"),
      );
      return;
    }
    final path = await _getDownloadDirectory();
    if (path == null) {
      _showAlertDialog(
        context,
        "Falha no download",
        Text("Diretorio incorreto"),
      );
      return;
    }
  }

  Future<void> _download(
    String url,
    String filePath, {
    bool? openFile,
  }) async {
    final progressDialog = DownloadProgressDialog(
      url: url,
      filePath: filePath,
      openFile: openFile ?? false,
    );
    return Platform.isAndroid
        ? showDialog(
            context: context,
            builder: (_) {
              return progressDialog;
            },
          )
        : showCupertinoDialog(
            context: context,
            builder: (_) {
              return progressDialog;
            },
          );
  }

  Future<List<String>> _getDownloadAndFilePaths(String downloadUrl) async {
    final fileName = downloadUrl.split("/").last;
    final path = await _getDownloadDirectory() as String;
    return [
      path,
      '$path${Platform.pathSeparator}$fileName',
    ];
  }

  void _handleRegisterDevice(List<dynamic> args) {
    final userId = args[0];
    final accountId = args[1];

    if (userId == null || accountId == null) return;

    subscribeToPushNotification(userId, accountId);
  }

  void _handleFileDownload(List<dynamic> args) async {
    _canDownload();
    String url = args[0];
    final paths = await _getDownloadAndFilePaths(url);
    await _download(
      url,
      paths.last,
      openFile: true,
    );
  }

  void _handleFileShare(List<dynamic> args) async {
    await _canDownload();
    String url = args[0];
    final paths = await _getDownloadAndFilePaths(url);
    final file = File(paths.last);
    if (!file.existsSync()) {
      await _download(url, file.path);
    }
    final fileName = file.path.split("/").last;
    Share.shareFiles([file.path], text: fileName);
  }

  void _handleOpenExternalLink(List<dynamic> args) async {
    String url = args[0];
    await launchUrl(
      Uri.parse(url),
      mode: LaunchMode.platformDefault,
    );
  }
}
