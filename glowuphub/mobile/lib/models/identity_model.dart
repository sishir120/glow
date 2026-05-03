class IdentityStatement {
  final String id;
  final String statement;
  final String category;
  final int strength;

  IdentityStatement({
    required this.id,
    required this.statement,
    required this.category,
    this.strength = 0,
  });

  factory IdentityStatement.fromJson(Map<String, dynamic> json) {
    return IdentityStatement(
      id: json['id'] ?? '',
      statement: json['statement'] ?? '',
      category: json['category'] ?? 'General',
      strength: json['strength'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'statement': statement,
      'category': category,
      'strength': strength,
    };
  }
}
