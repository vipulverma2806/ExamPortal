const genQuestions = [
  {
    question: 'What does SQL primarily stand for?',
    options: [
      'Structured Query Language',
      'Standard Question Logic',
      'Sequential Query Library',
      'Simple Query Link'
    ],
    answer: 'Structured Query Language',
    subject: 'DBMS'
  },
  {
    question: 'Which SQL command is used to retrieve data from a database?',
    options: [ 'GET', 'FETCH', 'SELECT', 'EXTRACT' ],
    answer: 'SELECT',
    subject: 'DBMS'
  },
  {
    question: 'Which SQL command is used to add new rows of data to a table?',
    options: [ 'ADD INTO', 'INSERT INTO', 'NEW ROW', 'CREATE ROW' ],
    answer: 'INSERT INTO',
    subject: 'DBMS'
  },
  {
    question: 'Which keyword is used to filter records based on a specified condition?',
    options: [ 'FILTER', 'CONDITION', 'WHERE', 'HAVING' ],
    answer: 'WHERE',
    subject: 'DBMS'
  },
  {
    question: 'Which SQL statement is used to delete existing records in a table?',
    options: [ 'REMOVE FROM', 'DELETE FROM', 'ERASE RECORDS', 'DROP RECORDS' ],
    answer: 'DELETE FROM',
    subject: 'DBMS'
  },
  {
    question: 'Which SQL statement is used to modify existing data in a table?',
    options: [ 'CHANGE', 'MODIFY', 'UPDATE', 'ALTER DATA' ],
    answer: 'UPDATE',
    subject: 'DBMS'
  },
  {
    question: 'Which SQL clause is used to sort the result-set of a query?',
    options: [ 'SORT BY', 'ORDER BY', 'ARRANGE BY', 'GROUP BY' ],
    answer: 'ORDER BY',
    subject: 'DBMS'
  }
]


export default genQuestions;
















 // let que_placeholders = [];
    // let option_placeholders = [];
    // let values = [];
    // let options = [];
    // genQuestions.map((quesObj, i) => {
    //   let a = i * 3;
    //   que_placeholders.push(`($${a + 1},$${a + 2},$${a + 3})`);
    //   values.push(quesObj.question, quesObj.answer, quesObj.subject);
    //   options.push(quesObj.options);
    // });

    // // return;
    // // await Question.insertMany(genQuestions);
    // await pool.query("BEGIN");
    // const responsePG = await pool.query(
    //   `INSERT INTO questions (question,answer,subject) VALUES ${que_placeholders.join()} RETURNING question_id`,
    //   values,
    // );
    // await pool.query('UPDATE ')

    // // console.log(responsePG.rows);
    // const final_Q_ids = [];
    // responsePG.rows.forEach((resObj) => {
    //   final_Q_ids.push(resObj.question_id);
    // });
    // // console.log(final_Q_ids);
    // // return;
    // // console.log(option_placeholders.join());
    // // const optionPlace = option_placeholders.join();
    // // const optionFlat = options.flat();

    // const finalArray = [];
    // let b = 0;
    // final_Q_ids.forEach((q_id, index) => {
    //   let a = index * 4;

    //   for (let i = a; i < a + 4; i++) {
    //     finalArray.push(optionFlat[i]);
    //     finalArray.push(q_id);
    //     option_placeholders.push(`($${b + 1},$${b + 2})`);
    //     b += 2;
    //   }
    // });

    // // console.log("Add Ai Questions 56", finalArray);
    // // console.log("addaiquestion 57", option_placeholders.join());
    // // console.log("addaiquestion 58", optionFlat);
    // // return;

    // await pool.query(
    //   `INSERT INTO options (option_text,question_id) VALUES ${option_placeholders.join()}`,
    //   finalArray,
    // );

    // // console.log(final_Q_ids);
    // // await pool.query(
    // //   `INSERT INTO options (question_id) VALUES ${option_placeholders.join(",")}`,
    // //   final_Q_ids,
    // // );
    // await pool.query("COMMIT");
    // // return;