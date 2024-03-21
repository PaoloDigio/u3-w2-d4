import { render, screen } from "@testing-library/react";
import App from "../App";
import BookList from "../components/BookList";
import fantasy from "../data/fantasy.json";

describe("test", () => {
  it("checks that component Welcome mounts", () => {
    render(<App />);
    const title = screen.getByText(/benvenuti in epibooks!/i);
    expect(title).toBeInTheDocument();
  });

  it("checks that every books in JSON has a card", () => {
    render(<BookList books={fantasy} />);
    const allImages = screen.getAllByRole("img");
    expect(allImages).toHaveLength(fantasy.length);
  });

  it("checks the presence of CommentArea", () => {
    render(<BookList books={fantasy} />);
    const formInput = screen.getByPlaceholderText(/inserisci qui il testo/i);
    expect(formInput).toBeInTheDocument();
  });

  it("returns two results if game is searched", () => {
    render(<BookList books={fantasy} />);
    const searchInput = screen.getByPlaceholderText(/cerca un libro/i);
    fireEvent.change(searchInput, { target: { value: "game" } });
    const allImages = screen.getAllByRole("img");
    expect(allImages).toHaveLength(2);
  });

  it("checks that clicking on a book the border has a different colour", () => {
    render(<BookList books={fantasy} />);
    const booksCard = screen.getAllByTestId("book-card");
    const firstBook = booksCard[0];
    fireEvent.click(firstBook);
    expect(firstBook).toHaveStyle("border: 3px solid red");
  });

  //   it("doesn't find any single comment at launch"), () => {
  //     render(<BookList books={fantasy} />)
  //     const allTheSingleComments = screen.queryAllByTestId("single-comment")
  //     expect(allTheSingleComments).toBeInTheDocument()
  //   }
  it("checks that clicking on another book, the border colour of the first book goes back to normal", () => {
    render(<BookList books={fantasy} />);
    const booksCard = screen.getAllByTestId("book-card");
    const firstBook = booksCard[0];
    fireEvent.click(firstBook);
    expect(firstBook).toHaveStyle("border: 3px solid red");
    const secondBook = booksCard[1];
    fireEvent.click(secondBook);
    expect(firstBook).not.toHaveStyle("border: 3px solid red");
  });

  it("no comments are on homepage on load", () => {
    render(<App />);
    const bookComments = screen.queryAllByTestId("single-comment");
    expect(bookComments).toHaveLength(0);
  });

  it("loads right comments of books", async () => {
    render(<App />);
    const booksCards = screen.getAllByTestId("book-card");
    const firstBook = booksCards[0];
    fireEvent.click(firstBook);
    const booksComments = await screen.findAllByTestId("single-comment");
    expect(booksComments).not.toHaveLength(0);
  });
});
