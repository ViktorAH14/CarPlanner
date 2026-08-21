import 'package:flutter/material.dart';
import 'features/home/presentation/home_screen.dart';

class CarPlannerApp extends StatelessWidget {
  const CarPlannerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Car Planner',
      theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.blue),
      home: const HomeScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}
