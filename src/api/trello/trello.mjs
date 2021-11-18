import Trello from "trello";

const trelloService = (() => {
  var trello = new Trello(process.env.TRELLO_KEY, "c06cd758edccf170adab8df0d9538f5138239313bb8f6e3c3ba017eeb28a21df");
  console.log('Boards: ') 
  var boardsIds = [];
  trello.getBoards('stansobolev', (err, res) => {
    res.forEach(board => {
      boardsIds.push(board.id)
      console.log(`${board.id}: ${board.name}`);
    });


 /* 
    var cardIds = []
    trello.getCardsOnBoard(boardsIds[0], (err, res) => {
      res.forEach(card => {
        cardIds.push(card.id);
        console.log('Card', card)
      });
      console.log('CardIds', cardIds);
    });
*/
  });

  trello.getListsOnBoard('5b855b835058658c7f0143d4').then((res, err) => {
    console.log('lists', err, res);
    trello.getCardsOnList(res[0].id).then((cards, err) => {
      console.log('Cards on ', res[0].name)
      console.log(cards);
    });
  });
});

export default trelloService;