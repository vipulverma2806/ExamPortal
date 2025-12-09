const array = [
  {
    _id: new ObjectId("68a19e119477ee6930e81616"),
    answer: "Q-Learning",
  },
  {
    _id: new ObjectId("68a19e119477ee6930e81614"),
    answer: "Natural Language Processing",
  },
  {
    _id: new ObjectId("68a19e119477ee6930e81619"),
    answer: "Deep Blue",
  },
  { _id: new ObjectId("68a19e119477ee6930e8161a"), answer: "K-means" },
  { _id: new ObjectId("68a19e119477ee6930e81617"), answer: "PCA" },
  { _id: new ObjectId("68a1904e77b1c80fd2bd513e"), answer: "drgrdg" },
  {
    _id: new ObjectId("68a19e119477ee6930e81612"),
    answer: "Naive Bayes",
  },
  { _id: new ObjectId("68a19e119477ee6930e8161b"), answer: "RNN" },
  { _id: new ObjectId("68a19e119477ee6930e81618"), answer: "A*" },
  { _id: new ObjectId("68a19e119477ee6930e81613"), answer: "BFS" },
  { _id: new ObjectId("68a19e119477ee6930e81615"), answer: "CNN" },
];

const OBJ = {};
array.forEach((item) => {
  OBJ = { ...OBJ, _id: item._id.toString() };
});

// array.forEach((item)=>{
//     OBJ = {...OBJ,item._id.toString():item.answer}
// })

console.log(OBJ);
