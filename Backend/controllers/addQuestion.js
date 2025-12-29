import Question from "../models/question.model.js";
const addQuestion = async (req, res) => {
  try {
    const { genQuestions, manualQuestion } = req.body;
    if (manualQuestion) {
      const { question, options, answer, subject } = manualQuestion;
      const newQuestion = new Question({ question, options, answer, subject });
      await newQuestion.save();
      return res.status(200).send("Question added!");
    }
    await Question.insertMany(genQuestions);
    console.log("q array added");
    return res.status(200).send("Questions added!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal SERVER error");
  }
};
export default addQuestion;

const arra = [
  // ==== AI ====
  {
    question: "Which algorithm is used for classification in Machine Learning?",
    options: ["K-means", "Naive Bayes", "Apriori", "Dijkstra"],
    answer: "Naive Bayes",
    subject: "AI",
  },
  {
    question: "Which search strategy is complete but not always optimal?",
    options: ["DFS", "BFS", "Greedy", "A*"],
    answer: "BFS",
    subject: "AI",
  },
  {
    question: "What does NLP stand for in AI?",
    options: [
      "Neural Language Processing",
      "Natural Language Processing",
      "Network Layer Protocol",
      "Node Link Parsing",
    ],
    answer: "Natural Language Processing",
    subject: "AI",
  },
  {
    question: "Which neural network is best for image recognition?",
    options: ["CNN", "RNN", "GAN", "DBN"],
    answer: "CNN",
    subject: "AI",
  },
  {
    question: "Which of the following is reinforcement learning?",
    options: [
      "Q-Learning",
      "Decision Trees",
      "Linear Regression",
      "Naive Bayes",
    ],
    answer: "Q-Learning",
    subject: "AI",
  },
  {
    question: "Which algorithm is used for dimensionality reduction?",
    options: ["PCA", "K-means", "SVM", "Apriori"],
    answer: "PCA",
    subject: "AI",
  },
  {
    question: "Which of these is a heuristic search algorithm?",
    options: ["A*", "DFS", "BFS", "Brute Force"],
    answer: "A*",
    subject: "AI",
  },
  {
    question: "Which AI system defeated humans in chess?",
    options: ["Deep Blue", "AlphaGo", "Watson", "Siri"],
    answer: "Deep Blue",
    subject: "AI",
  },
  {
    question: "Which is an unsupervised learning algorithm?",
    options: ["K-means", "SVM", "Decision Tree", "Naive Bayes"],
    answer: "K-means",
    subject: "AI",
  },
  {
    question: "Which model is used for sequence prediction?",
    options: ["CNN", "RNN", "SVM", "KNN"],
    answer: "RNN",
    subject: "AI",
  },

  // ==== OS ====
  {
    question: "Which OS is open source?",
    options: ["Windows", "Linux", "MacOS", "DOS"],
    answer: "Linux",
    subject: "OS",
  },
  {
    question: "What is thrashing in OS?",
    options: [
      "High CPU usage",
      "Excessive swapping",
      "Deadlock",
      "Fragmentation",
    ],
    answer: "Excessive swapping",
    subject: "OS",
  },
  {
    question: "Which scheduling algorithm is preemptive?",
    options: ["FCFS", "SJF", "Round Robin", "Priority (non-preemptive)"],
    answer: "Round Robin",
    subject: "OS",
  },
  {
    question: "Which mechanism prevents deadlock?",
    options: ["Mutex", "Banker's Algorithm", "Semaphore", "Paging"],
    answer: "Banker's Algorithm",
    subject: "OS",
  },
  {
    question: "Which memory allocation suffers from external fragmentation?",
    options: ["Paging", "Segmentation", "Swapping", "Demand Paging"],
    answer: "Segmentation",
    subject: "OS",
  },
  {
    question: "Which is NOT a type of kernel?",
    options: ["Monolithic", "Microkernel", "Hybrid", "Pipeline"],
    answer: "Pipeline",
    subject: "OS",
  },
  {
    question: "What is the smallest unit of memory managed by paging?",
    options: ["Frame", "Segment", "Block", "Cluster"],
    answer: "Frame",
    subject: "OS",
  },
  {
    question: "Which of these is a disk scheduling algorithm?",
    options: ["SSTF", "FIFO", "LRU", "Round Robin"],
    answer: "SSTF",
    subject: "OS",
  },
  {
    question: "Which layer of OS interacts with hardware?",
    options: ["Application Layer", "Kernel", "Shell", "User Interface"],
    answer: "Kernel",
    subject: "OS",
  },
  {
    question: "Which is a non-preemptive scheduling algorithm?",
    options: ["Round Robin", "SJF", "Priority Scheduling", "FCFS"],
    answer: "FCFS",
    subject: "OS",
  },

  // ==== DBMS ====
  {
    question: "Which key uniquely identifies a record in a table?",
    options: ["Primary Key", "Foreign Key", "Candidate Key", "Super Key"],
    answer: "Primary Key",
    subject: "DBMS",
  },
  {
    question:
      "Which SQL command is used to remove all records but keep the structure?",
    options: ["DROP", "DELETE", "TRUNCATE", "REMOVE"],
    answer: "TRUNCATE",
    subject: "DBMS",
  },
  {
    question: "Which normal form removes transitive dependency?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    answer: "3NF",
    subject: "DBMS",
  },
  {
    question:
      "Which join returns all rows when there is a match in one of the tables?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
    answer: "FULL OUTER JOIN",
    subject: "DBMS",
  },
  {
    question: "Which of these is a NoSQL database?",
    options: ["MongoDB", "MySQL", "PostgreSQL", "Oracle"],
    answer: "MongoDB",
    subject: "DBMS",
  },
  {
    question: "Which operation is used in relational algebra for filtering?",
    options: ["Union", "Selection", "Projection", "Join"],
    answer: "Selection",
    subject: "DBMS",
  },
  {
    question: "Which command is used to rollback a transaction?",
    options: ["SAVEPOINT", "ROLLBACK", "COMMIT", "CANCEL"],
    answer: "ROLLBACK",
    subject: "DBMS",
  },
  {
    question:
      "Which type of key is a field in one table that refers to primary key in another?",
    options: ["Super Key", "Foreign Key", "Composite Key", "Alternate Key"],
    answer: "Foreign Key",
    subject: "DBMS",
  },
  {
    question: "Which indexing technique uses B-Trees?",
    options: ["Clustered Index", "Hash Index", "Dense Index", "Sparse Index"],
    answer: "Clustered Index",
    subject: "DBMS",
  },
  {
    question: "Which constraint ensures no null values?",
    options: ["NOT NULL", "UNIQUE", "DEFAULT", "CHECK"],
    answer: "NOT NULL",
    subject: "DBMS",
  },

  // ==== DSA ====
  {
    question: "Which data structure works on FIFO?",
    options: ["Stack", "Queue", "Heap", "Graph"],
    answer: "Queue",
    subject: "DSA",
  },
  {
    question: "Which sorting algorithm has O(n log n) complexity in best case?",
    options: ["Bubble Sort", "Merge Sort", "Insertion Sort", "Selection Sort"],
    answer: "Merge Sort",
    subject: "DSA",
  },
  {
    question: "Which traversal method is used in BFS?",
    options: ["Queue", "Stack", "Recursion", "Heap"],
    answer: "Queue",
    subject: "DSA",
  },
  {
    question: "Which data structure is used in Dijkstra's algorithm?",
    options: ["Stack", "Queue", "Priority Queue", "Hash Table"],
    answer: "Priority Queue",
    subject: "DSA",
  },
  {
    question: "Which algorithm uses divide and conquer?",
    options: ["Quick Sort", "Dijkstra", "Bellman Ford", "Prim’s"],
    answer: "Quick Sort",
    subject: "DSA",
  },
  {
    question: "Which tree is always height balanced?",
    options: ["Binary Tree", "AVL Tree", "BST", "Heap"],
    answer: "AVL Tree",
    subject: "DSA",
  },
  {
    question: "Which data structure is best for implementing recursion?",
    options: ["Queue", "Stack", "Heap", "Array"],
    answer: "Stack",
    subject: "DSA",
  },
  {
    question: "Which algorithm finds the minimum spanning tree?",
    options: ["Kruskal", "Floyd-Warshall", "Dijkstra", "Bellman-Ford"],
    answer: "Kruskal",
    subject: "DSA",
  },
  {
    question: "Which traversal visits root first in trees?",
    options: ["Inorder", "Preorder", "Postorder", "Level Order"],
    answer: "Preorder",
    subject: "DSA",
  },
  {
    question: "Which hashing technique resolves collisions by chaining?",
    options: [
      "Open Addressing",
      "Linear Probing",
      "Separate Chaining",
      "Quadratic Probing",
    ],
    answer: "Separate Chaining",
    subject: "DSA",
  },

  // ==== C++ ====
  {
    question: "Which operator is overloaded for output in C++?",
    options: ["<<", ">>", "=", "+"],
    answer: "<<",
    subject: "C++",
  },
  {
    question: "Which type of inheritance leads to diamond problem?",
    options: ["Single", "Multiple", "Hierarchical", "Multilevel"],
    answer: "Multiple",
    subject: "C++",
  },
  {
    question: "Which keyword is used to declare an abstract class?",
    options: ["abstract", "virtual", "override", "final"],
    answer: "virtual",
    subject: "C++",
  },
  {
    question:
      "Which function is called automatically when an object is created?",
    options: ["Constructor", "Destructor", "Operator", "Overloaded Function"],
    answer: "Constructor",
    subject: "C++",
  },
  {
    question: "Which of the following is NOT a storage class in C++?",
    options: ["auto", "register", "static", "volatile"],
    answer: "volatile",
    subject: "C++",
  },
  {
    question: "Which OOP concept allows multiple functions with same name?",
    options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"],
    answer: "Polymorphism",
    subject: "C++",
  },
  {
    question: "Which function is executed when object goes out of scope?",
    options: ["Destructor", "Constructor", "Main", "Inline Function"],
    answer: "Destructor",
    subject: "C++",
  },
  {
    question: "Which of these is not a type of constructor?",
    options: ["Default", "Parameterized", "Copy", "Virtual"],
    answer: "Virtual",
    subject: "C++",
  },
  {
    question: "Which operator is used to access class members?",
    options: [".", "->", "::", ","],
    answer: ".",
    subject: "C++",
  },
  {
    question: "Which function in C++ is used for dynamic memory allocation?",
    options: ["malloc", "calloc", "new", "alloc"],
    answer: "new",
    subject: "C++",
  },
];
