import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:frontend/features/home/presentation/home_screen.dart';

void main() {
  testWidgets('HomeScreen renders header, stats cards and action button', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const MaterialApp(home: HomeScreen()));

    await tester.pump;

    // Checking the header
    expect(find.text('Plan your car expenses'), findsOneWidget);
    expect(
      find.text(
        'Plan maintenance and take into account the costs of the vehicle.',
      ),
      findsOneWidget,
    );

    // Checking the availability of three cards
    expect(find.text('Fuel'), findsOneWidget);
    expect(find.text('Service'), findsOneWidget);
    expect(find.text('Repair and other things'), findsOneWidget);

    // Checking the values in the cards
    expect(find.text('3'), findsOneWidget);
    expect(find.text('0'), findsOneWidget);
    expect(find.text('1'), findsOneWidget);

    // Checking the button
    expect(find.byType(ElevatedButton), findsOneWidget);
    expect(find.text('Add record'), findsOneWidget);
  });

  testWidgets('HomeScreen shows SnackBar when Add Car button is pressed', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(const MaterialApp(home: HomeScreen()));

    final addCarButton = find.text('Add record');
    expect(addCarButton, findsOneWidget);

    await tester.tap(addCarButton);
    await tester
        .pump(); // Let’s give it some time for onPressed to trigger and show the SnackBar.

    expect(find.text('Feature under development'), findsOneWidget);
  });
}
