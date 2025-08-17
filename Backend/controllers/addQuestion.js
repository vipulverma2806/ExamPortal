
const Question = require("../models/question.model")
const addQuestion = async (req, res) => {
  const { question, options, answer, category } = req.body;
  const newQuestion = new Question({ question, options, answer, category });
  const insert = await Question.insertMany(arra)
  await newQuestion.save();
  res.send('Question added!');
}
module.exports = addQuestion;


const arra = [
  // ==== AI ====
  {
    question: "Which algorithm is used for classification in Machine Learning?",
    options: ["K-means", "Naive Bayes", "Apriori", "Dijkstra"],
    answer: "Naive Bayes",
    category: "AI",
  },
  {
    question: "Which search strategy is complete but not always optimal?",
    options: ["DFS", "BFS", "Greedy", "A*"],
    answer: "BFS",
    category: "AI",
  },
  {
    question: "What does NLP stand for in AI?",
    options: ["Neural Language Processing", "Natural Language Processing", "Network Layer Protocol", "Node Link Parsing"],
    answer: "Natural Language Processing",
    category: "AI",
  },
  {
    question: "Which neural network is best for image recognition?",
    options: ["CNN", "RNN", "GAN", "DBN"],
    answer: "CNN",
    category: "AI",
  },
  {
    question: "Which of the following is reinforcement learning?",
    options: ["Q-Learning", "Decision Trees", "Linear Regression", "Naive Bayes"],
    answer: "Q-Learning",
    category: "AI",
  },
  {
    question: "Which algorithm is used for dimensionality reduction?",
    options: ["PCA", "K-means", "SVM", "Apriori"],
    answer: "PCA",
    category: "AI",
  },
  {
    question: "Which of these is a heuristic search algorithm?",
    options: ["A*", "DFS", "BFS", "Brute Force"],
    answer: "A*",
    category: "AI",
  },
  {
    question: "Which AI system defeated humans in chess?",
    options: ["Deep Blue", "AlphaGo", "Watson", "Siri"],
    answer: "Deep Blue",
    category: "AI",
  },
  {
    question: "Which is an unsupervised learning algorithm?",
    options: ["K-means", "SVM", "Decision Tree", "Naive Bayes"],
    answer: "K-means",
    category: "AI",
  },
  {
    question: "Which model is used for sequence prediction?",
    options: ["CNN", "RNN", "SVM", "KNN"],
    answer: "RNN",
    category: "AI",
  },

  // ==== OS ====
  {
    question: "Which OS is open source?",
    options: ["Windows", "Linux", "MacOS", "DOS"],
    answer: "Linux",
    category: "OS",
  },
  {
    question: "What is thrashing in OS?",
    options: ["High CPU usage", "Excessive swapping", "Deadlock", "Fragmentation"],
    answer: "Excessive swapping",
    category: "OS",
  },
  {
    question: "Which scheduling algorithm is preemptive?",
    options: ["FCFS", "SJF", "Round Robin", "Priority (non-preemptive)"],
    answer: "Round Robin",
    category: "OS",
  },
  {
    question: "Which mechanism prevents deadlock?",
    options: ["Mutex", "Banker's Algorithm", "Semaphore", "Paging"],
    answer: "Banker's Algorithm",
    category: "OS",
  },
  {
    question: "Which memory allocation suffers from external fragmentation?",
    options: ["Paging", "Segmentation", "Swapping", "Demand Paging"],
    answer: "Segmentation",
    category: "OS",
  },
  {
    question: "Which is NOT a type of kernel?",
    options: ["Monolithic", "Microkernel", "Hybrid", "Pipeline"],
    answer: "Pipeline",
    category: "OS",
  },
  {
    question: "What is the smallest unit of memory managed by paging?",
    options: ["Frame", "Segment", "Block", "Cluster"],
    answer: "Frame",
    category: "OS",
  },
  {
    question: "Which of these is a disk scheduling algorithm?",
    options: ["SSTF", "FIFO", "LRU", "Round Robin"],
    answer: "SSTF",
    category: "OS",
  },
  {
    question: "Which layer of OS interacts with hardware?",
    options: ["Application Layer", "Kernel", "Shell", "User Interface"],
    answer: "Kernel",
    category: "OS",
  },
  {
    question: "Which is a non-preemptive scheduling algorithm?",
    options: ["Round Robin", "SJF", "Priority Scheduling", "FCFS"],
    answer: "FCFS",
    category: "OS",
  },

  // ==== DBMS ====
  {
    question: "Which key uniquely identifies a record in a table?",
    options: ["Primary Key", "Foreign Key", "Candidate Key", "Super Key"],
    answer: "Primary Key",
    category: "DBMS",
  },
  {
    question: "Which SQL command is used to remove all records but keep the structure?",
    options: ["DROP", "DELETE", "TRUNCATE", "REMOVE"],
    answer: "TRUNCATE",
    category: "DBMS",
  },
  {
    question: "Which normal form removes transitive dependency?",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    answer: "3NF",
    category: "DBMS",
  },
  {
    question: "Which join returns all rows when there is a match in one of the tables?",
    options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
    answer: "FULL OUTER JOIN",
    category: "DBMS",
  },
  {
    question: "Which of these is a NoSQL database?",
    options: ["MongoDB", "MySQL", "PostgreSQL", "Oracle"],
    answer: "MongoDB",
    category: "DBMS",
  },
  {
    question: "Which operation is used in relational algebra for filtering?",
    options: ["Union", "Selection", "Projection", "Join"],
    answer: "Selection",
    category: "DBMS",
  },
  {
    question: "Which command is used to rollback a transaction?",
    options: ["SAVEPOINT", "ROLLBACK", "COMMIT", "CANCEL"],
    answer: "ROLLBACK",
    category: "DBMS",
  },
  {
    question: "Which type of key is a field in one table that refers to primary key in another?",
    options: ["Super Key", "Foreign Key", "Composite Key", "Alternate Key"],
    answer: "Foreign Key",
    category: "DBMS",
  },
  {
    question: "Which indexing technique uses B-Trees?",
    options: ["Clustered Index", "Hash Index", "Dense Index", "Sparse Index"],
    answer: "Clustered Index",
    category: "DBMS",
  },
  {
    question: "Which constraint ensures no null values?",
    options: ["NOT NULL", "UNIQUE", "DEFAULT", "CHECK"],
    answer: "NOT NULL",
    category: "DBMS",
  },

  // ==== DSA ====
  {
    question: "Which data structure works on FIFO?",
    options: ["Stack", "Queue", "Heap", "Graph"],
    answer: "Queue",
    category: "DSA",
  },
  {
    question: "Which sorting algorithm has O(n log n) complexity in best case?",
    options: ["Bubble Sort", "Merge Sort", "Insertion Sort", "Selection Sort"],
    answer: "Merge Sort",
    category: "DSA",
  },
  {
    question: "Which traversal method is used in BFS?",
    options: ["Queue", "Stack", "Recursion", "Heap"],
    answer: "Queue",
    category: "DSA",
  },
  {
    question: "Which data structure is used in Dijkstra's algorithm?",
    options: ["Stack", "Queue", "Priority Queue", "Hash Table"],
    answer: "Priority Queue",
    category: "DSA",
  },
  {
    question: "Which algorithm uses divide and conquer?",
    options: ["Quick Sort", "Dijkstra", "Bellman Ford", "Prim’s"],
    answer: "Quick Sort",
    category: "DSA",
  },
  {
    question: "Which tree is always height balanced?",
    options: ["Binary Tree", "AVL Tree", "BST", "Heap"],
    answer: "AVL Tree",
    category: "DSA",
  },
  {
    question: "Which data structure is best for implementing recursion?",
    options: ["Queue", "Stack", "Heap", "Array"],
    answer: "Stack",
    category: "DSA",
  },
  {
    question: "Which algorithm finds the minimum spanning tree?",
    options: ["Kruskal", "Floyd-Warshall", "Dijkstra", "Bellman-Ford"],
    answer: "Kruskal",
    category: "DSA",
  },
  {
    question: "Which traversal visits root first in trees?",
    options: ["Inorder", "Preorder", "Postorder", "Level Order"],
    answer: "Preorder",
    category: "DSA",
  },
  {
    question: "Which hashing technique resolves collisions by chaining?",
    options: ["Open Addressing", "Linear Probing", "Separate Chaining", "Quadratic Probing"],
    answer: "Separate Chaining",
    category: "DSA",
  },

  // ==== C++ ====
  {
    question: "Which operator is overloaded for output in C++?",
    options: ["<<", ">>", "=", "+"],
    answer: "<<",
    category: "C++",
  },
  {
    question: "Which type of inheritance leads to diamond problem?",
    options: ["Single", "Multiple", "Hierarchical", "Multilevel"],
    answer: "Multiple",
    category: "C++",
  },
  {
    question: "Which keyword is used to declare an abstract class?",
    options: ["abstract", "virtual", "override", "final"],
    answer: "virtual",
    category: "C++",
  },
  {
    question: "Which function is called automatically when an object is created?",
    options: ["Constructor", "Destructor", "Operator", "Overloaded Function"],
    answer: "Constructor",
    category: "C++",
  },
  {
    question: "Which of the following is NOT a storage class in C++?",
    options: ["auto", "register", "static", "volatile"],
    answer: "volatile",
    category: "C++",
  },
  {
    question: "Which OOP concept allows multiple functions with same name?",
    options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"],
    answer: "Polymorphism",
    category: "C++",
  },
  {
    question: "Which function is executed when object goes out of scope?",
    options: ["Destructor", "Constructor", "Main", "Inline Function"],
    answer: "Destructor",
    category: "C++",
  },
  {
    question: "Which of these is not a type of constructor?",
    options: ["Default", "Parameterized", "Copy", "Virtual"],
    answer: "Virtual",
    category: "C++",
  },
  {
    question: "Which operator is used to access class members?",
    options: [".", "->", "::", ","],
    answer: ".",
    category: "C++",
  },
  {
    question: "Which function in C++ is used for dynamic memory allocation?",
    options: ["malloc", "calloc", "new", "alloc"],
    answer: "new",
    category: "C++",
  },
];
