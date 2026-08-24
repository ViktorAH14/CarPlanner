import 'package:flutter/material.dart';
import 'app.dart';

/// The entry point of the CarPlanner application.
///
/// This file initializes and runs the Flutter application by invoking [runApp]
/// with an instance of [CarPlannerApp]. It serves as the starting point for
/// the app’s execution and is responsible for mounting the root widget into
/// the Flutter engine.
///
/// To launch the application, execute the following command in the terminal:
/// ```bash
/// flutter run
/// ```
///
/// Example usage:
/// ```dart
/// void main() {
///   runApp(const CarPlannerApp());
/// }
/// ```
///
/// See also:
///   - [CarPlannerApp] — the main application widget that configures the app’s
///     theme, title, and home screen.
///   - [runApp] — Flutter’s function for booting the application and attaching
///     the root widget to the engine.
void main() {
  runApp(const CarPlannerApp());
}
