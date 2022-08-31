import 'dart:convert';
import 'package:fitbank_450/features/common/common.dart';
import 'package:http/http.dart' as http;

Future<String> _generateApplicationJwt() async {
  final response = await get('/Auth');
  return response.headers['x-application-token']!;
}

Future<Map?> post(String endpoint, Object body) async {
  final url = '$apiUrl$endpoint';
  final token = await _generateApplicationJwt();

  final response = await http.post(
    Uri.parse(url),
    body: json.encode(body),
    headers: {
      'x-api-version': '1',
      'x-application-key': apiKey,
      'x-application-token': token,
      'Content-Type': 'application/json; charset=utf-8'
    },
  );

  if (response.statusCode == 200) return jsonDecode(response.body);

  return null;
}

Future<http.Response> get(String endpoint) async {
  return http.get(Uri.parse('$apiUrl$endpoint'), headers: {
    'x-api-version': '1',
    'x-application-key': apiKey,
  });
}
