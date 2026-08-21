import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
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
