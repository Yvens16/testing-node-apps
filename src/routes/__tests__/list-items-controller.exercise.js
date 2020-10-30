// Testing Controllers

// 🐨 you'll need a few of the generaters from test/utils/generate.js
// 💰 remember, you can import files in the test/utils directory as if they're node_modules
import * as generate from 'utils/generate'

// 🐨 getListItem calls `expandBookData` which calls `booksDB.readById`
// so you'll need to import the booksDB from '../../db/books'
import * as booksDB from '../../db/books'

// 🐨 don't forget to import the listItemsController from '../list-items-controller'
// here, that's the thing we're testing afterall :)
import * as listItemsController from '../list-items-controller'

// 🐨 use jest.mock to mock '../../db/books' because we don't actually want to make
// database calls in this test file.
jest.mock('../../db/books');

// 🐨 ensure that all mock functions have their call history cleared using
// jest.clearAllMocks here as in the example.
beforeEach(() => {
  jest.clearAllMocks();
});

test('getListItem returns the req.listItem', async () => {
  // 🐨 create a user
  //
  const user = generate.buildUser();
  // 🐨 create a book
  //
  const book = generate.buildBook();
  // 🐨 create a listItem that has the user as the owner and the book
  const listItem = generate.buildListItem({ownerId: user.id, bookId: book.id})
  //
  // 🐨 mock booksDB.readById to resolve to the book
  // 💰 use mockResolvedValueOnce
  booksDB.readById.mockResolvedValueOnce(book);
  //
  // 🐨 make a request object that has properties for the user and listItem
  // 💰 checkout the implementation of getListItem in ../list-items-controller
  // to see how the request object is used and what properties it needs.
  // 💰 and you can use buildReq from utils/generate
  const req = generate.buildReq({listItem})
  //
  // 🐨 make a response object
  // 💰 just use buildRes from utils/generate
  const res = generate.buildRes()
  //
  // 🐨 make a call to getListItem with the req and res (`await` the result)
  //
  await listItemsController.getListItem(req, res)
  // 🐨 assert that booksDB.readById was called correctly
  //
  expect(booksDB.readById).toHaveBeenCalledWith(listItem.bookId)
  //🐨 assert that res.json was called correctly
  expect(res.json).toHaveBeenCalledWith({
    listItem: {...listItem, book},
  })
})

//TODO: START FROM VIDEO 15 AN REDO ALL THE EXERCICE TO VIDEO 23
//TODO: EXPLANATION AND EXERCICE ARE IN THE VIDEO 13
