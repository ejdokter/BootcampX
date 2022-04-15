const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`, [`%${process.argv[2]}%`])
.then(res => {
  res.rows.forEach(rows => {
    console.log(`${rows.cohort}: ${rows.teacher}`)
  })
})
.catch(err => console.error('query error', err.stack))



