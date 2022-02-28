import { render, screen } from "@testing-library/react";
import Moneybags from "./Moneybags";

test("renders learn react link", () => {
    render(<Moneybags />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
