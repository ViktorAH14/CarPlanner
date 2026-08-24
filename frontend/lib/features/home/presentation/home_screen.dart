/// The main home screen of the CarPlanner application.
///
/// This screen provides a high-level overview of vehicle-related metrics and
/// serves as the entry point for adding new expense or maintenance records.
///
/// ## Features
/// - Displays a descriptive header with the screen's purpose.
/// - Shows three summary statistic cards:
///   - **Fuel**: Tracks fuel-related entries.
///   - **Service**: Tracks scheduled or performed services.
///   - **Repair and other things**: Tracks repairs and miscellaneous costs.
/// - Provides an "Add record" action button to initiate new entries.
///
/// ## Usage
/// ```dart
/// const HomeScreen()
/// ```
///
/// Ensure this widget is used within a [MaterialApp] context so that
/// [ScaffoldMessenger] and other Material components function correctly.
///
/// ## Dependencies
/// - `package:flutter/material.dart`
///
import 'package:flutter/material.dart';

/// A stateless widget representing the home screen of the CarPlanner app.
///
/// The screen is designed with a clean, responsive layout suitable for both
/// mobile and tablet devices. It uses a vertically scrollable content area
/// to accommodate varying screen sizes.
class HomeScreen extends StatelessWidget {
  /// Creates a [HomeScreen] widget.
  ///
  /// The [key] argument is provided for widget identification in the tree.
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('CarPlanner'),
        centerTitle: true,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(height: 24),
            _buildHeader(),
            const SizedBox(height: 24),
            _buildStatsCards(),
            const SizedBox(height: 24),
            _buildActionButton(context),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  /// Builds the header section of the home screen.
  ///
  /// Displays the main title and a brief description of the screen's functionality.
  Widget _buildHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Plan your car expenses',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        Text(
          'Plan maintenance and take into account the costs of the vehicle.',
          style: TextStyle(color: Colors.grey.withOpacity(0.7), fontSize: 16),
        ),
      ],
    );
  }

  /// Builds a row of statistic cards displaying key metrics.
  ///
  /// Currently displays three cards for:
  /// - Fuel entries
  /// - Service entries
  /// - Repair and other entries
  Widget _buildStatsCards() {
    // Removed unused variable 'cardHeight'
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        _buildStatCard('Fuel', '3', Colors.blue),
        _buildStatCard('Service', '0', Colors.orange),
        _buildStatCard('Repair and other things', '1', Colors.green),
      ],
    );
  }

  /// Builds a single statistic card with a label and a value.
  ///
  /// [label] is the description of the metric (e.g., "Fuel").
  /// [value] is the current count or value for that metric.
  /// [baseColor] is the primary color used to tint the card background.
  Widget _buildStatCard(String label, String value, Color baseColor) {
    // Use withOpacity safely; for Material 3 it's still acceptable for backgrounds.
    // If you want to avoid any deprecation warnings entirely, you can use Color.fromRGBO instead.
    final cardColor = baseColor.withOpacity(0.08);

    return Expanded(
      child: Card(
        elevation: 1,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        color: cardColor,
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                label,
                style: TextStyle(fontSize: 12, color: Colors.grey.shade700),
              ),
              const SizedBox(height: 4),
              Text(
                value,
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  /// Builds the "Add record" action button.
  ///
  /// When pressed, displays a temporary snack bar indicating that the feature
  /// is under development. This will be replaced with actual navigation logic
  /// in future iterations.
  ///
  /// [context] is required to access the [ScaffoldMessenger] for showing
  /// the snack bar.
  Widget _buildActionButton(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: () {
        // TODO: Replace with real navigation logic later
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Feature under development')),
        );
      },
      icon: const Icon(Icons.add_circle),
      label: const Text('Add record'),
      style: ElevatedButton.styleFrom(
        padding: const EdgeInsets.symmetric(vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }
}
