import { render, screen } from "@testing-library/react";

import SolidBudget from "./SolidBudget";

test("renders learn react link", () => {
    render(<SolidBudget />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
