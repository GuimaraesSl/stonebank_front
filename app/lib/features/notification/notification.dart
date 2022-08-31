import 'dart:async';
import 'dart:io';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import '../common/common.dart';
import '../../firebase_options.dart';

const _tokenKey = 'deviceToken';
const _permissionsKey = 'notification_permissions';

const AndroidNotificationChannel channel = AndroidNotificationChannel(
  'high_importance_channel',
  'High Importance Notifications',
  importance: Importance.high,
);

final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
    FlutterLocalNotificationsPlugin();

Future<void> subscribeToPushNotification(int userId, int accountId) async {
  /*   
  var token = await Storage.getValue<String>(_tokenKey);
  if (token != null) return; 
*/
  var token = await FirebaseMessaging.instance.getToken();
  final body = {
    "token": token,
    "userId": userId,
    "accountId": accountId,
  };
  final response = await post('/Device', body);

  if (response != null && response['success'])
    Storage.setValue(_tokenKey, token);
}

Future<void> setupNotificationListeners() async {
  await Firebase.initializeApp(
    name: 'fitbank_450',
    options: DefaultFirebaseOptions.currentPlatform,
  );
  if (Platform.isIOS) {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  }

  await _checkPermissions();

  FirebaseMessaging.onMessage.listen(_handleForegroundNotification);
  FirebaseMessaging.onBackgroundMessage;
}

Future<void> _checkPermissions() async {
  var permissions = await Storage.getValue<String>(_permissionsKey);
  if (permissions == null ||
      permissions == AuthorizationStatus.denied.toString()) {
    final settings = await FirebaseMessaging.instance.requestPermission(
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      criticalAlert: false,
      provisional: false,
      sound: true,
    );
    Storage.setValue(
      _permissionsKey,
      settings.authorizationStatus.toString(),
    );
  }
}

_handleForegroundNotification(RemoteMessage message) {
  _showNotification(message.notification!);
}

void _showNotification(RemoteNotification notification) {
  flutterLocalNotificationsPlugin.show(
    notification.hashCode,
    notification.title,
    notification.body,
    NotificationDetails(
      android: AndroidNotificationDetails(
        channel.id,
        channel.name,
        icon: '@mipmap/launch_image',
      ),
    ),
  );
}
