// seed.js
const db = require('./config/db');

async function seedTasks() {
  try {
    // Sample tasks
    const tasks = [
      { title: 'Learn Node.js', description: 'Complete Node.js tutorial', status: 'pending' },
      { title: 'Learn MySQL', description: 'Complete MySQL LAB', status: 'in-progress' },
      { title: 'Build REST API', description: 'Create API for project', status: 'pending' },
      { title: 'Test API', description: 'Use Postman to test endpoints', status: 'completed' },
      { title: 'Write Report', description: 'Document the project', status: 'pending' },
      { title: 'Debug Errors', description: 'Fix server errors', status: 'in-progress' },
      { title: 'Setup Frontend', description: 'Connect frontend with backend', status: 'pending' },
      { title: 'Deploy App', description: 'Deploy project to server', status: 'pending' },
      { title: 'Learn Express', description: 'Study Express framework', status: 'completed' },
      { title: 'Design Database', description: 'Plan DB schema', status: 'completed' },
      { title: 'Write Tests', description: 'Implement unit tests', status: 'in-progress' },
      { title: 'Refactor Code', description: 'Clean up codebase', status: 'pending' },
      { title: 'Optimize Queries', description: 'Improve SQL queries', status: 'in-progress' },
      { title: 'Add Pagination', description: 'Implement pagination', status: 'pending' },
      { title: 'Add Search', description: 'Implement search functionality', status: 'completed' }
    ];

    // Insert tasks into DB
    for (const task of tasks) {
      // Avoid duplicates by checking title
      const [existing] = await db.query('SELECT * FROM tasks WHERE title = ?', [task.title]);
      if (existing.length === 0) {
        await db.query(
          'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
          [task.title, task.description, task.status]
        );
      }
    }

    console.log('✅ Seeding completed!');
    process.exit(0);

  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedTasks();
