import 'package:flutter/material.dart';
import 'features/home/presentation/home_screen.dart';

/// The main entry point of the Car Planner application.
///
/// This widget serves as the root of the application and configures the
/// [MaterialApp] with the necessary settings, including the theme, title,
/// and initial home screen. It adheres to Material Design 3 guidelines and
/// uses a blue color scheme as the seed color.
///
/// The home screen is set to [HomeScreen], providing the initial user interface
/// for the Car Planner app.
class CarPlannerApp extends StatelessWidget {
  /// Creates a [CarPlannerApp] instance.
  ///
  /// The optional [key] argument is forwarded to the superclass constructor.
  /// It is used to uniquely identify this widget within the widget tree when
  /// necessary for performance or state management considerations.
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
