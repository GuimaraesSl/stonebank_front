import 'package:shared_preferences/shared_preferences.dart';

class Storage {
  static SharedPreferences? _preferences;

  static Future<SharedPreferences> get _provider async {
    if (_preferences == null)
      _preferences = await SharedPreferences.getInstance();

    return _preferences!;
  }

  static Future<bool> setValue(String key, dynamic value) async {
    final provider = await _provider;

    switch (value.runtimeType) {
      case bool:
        return provider.setBool(key, value);

      case double:
        return provider.setDouble(key, value);

      case int:
        return provider.setInt(key, value);

      case String:
        return provider.setString(key, value);

      case List:
        return provider.setStringList(key, value);

      default:
        throw new ArgumentError("Tipo de dado não suportado", 'value');
    }
  }

  static Future<T?> getValue<T>(String key) async {
    final provider = await _provider;
    return provider.get(key) as T?;
  }
}
