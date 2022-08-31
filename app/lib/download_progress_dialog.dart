import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:open_file/open_file.dart';

class DownloadProgressDialog extends StatefulWidget {
  final String url;
  final String filePath;
  final bool openFile;

  DownloadProgressDialog({
    required this.url,
    required this.filePath,
    this.openFile = false,
  });

  @override
  _DownloadProgressDialogState createState() => _DownloadProgressDialogState();
}

class _DownloadProgressDialogState extends State<DownloadProgressDialog> {
  var _downloading = true;
  var _error = false;

  bool get _completed => !(_downloading && _error);

  @override
  void initState() {
    super.initState();

    if (File(widget.filePath).existsSync()) {
      _openFile();
      Navigator.of(context).pop();
      return;
    }

    Dio().download(widget.url, widget.filePath).catchError((_) {
      setState(() {
        _error = true;
      });
    }).whenComplete(() {
      Navigator.of(context).pop();

      setState(() {
        _downloading = false;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    if (widget.openFile && _completed) {
      _openFile();
    }

    return _buildDialog();
  }

  Widget _buildDialog() {
    const title = Text('Comprovante');
    final closeActionText = Text('Fechar');
    final onCloseActionPressed = () {
      Navigator.of(context).pop();
    };

    final progressIndicator = Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: CircularProgressIndicator(),
    );
    final content = Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        progressIndicator,
        Text(
          _error
              ? 'Ocorreu um erro ao fazer o download do comprovante'
              : 'Comprovante sendo baixado, por favor aguarde.',
        ),
      ],
    );

    if (Platform.isAndroid)
      return AlertDialog(
        title: title,
        content: content,
        actions: [
          TextButton(
            onPressed: onCloseActionPressed,
            child: closeActionText,
          ),
        ],
      );

    return CupertinoAlertDialog(
      title: title,
      content: content,
      actions: [
        CupertinoDialogAction(
          child: closeActionText,
          onPressed: onCloseActionPressed,
        ),
      ],
    );
  }

  Future<dynamic> _openFile() {
    return OpenFile.open(widget.filePath);
  }
}
