import { fireEvent, render,screen } from "@testing-library/react";

import Counter from "./Counter";
import userEvent from "@testing-library/user-event";

test("Counter Components working properly ",()=>{
    render(<Counter/>);
    const buttonElement=screen.getByText(/Click Me/i)
    fireEvent.click(buttonElement)      //stimualte button click event
    const updatedCount=screen.getByText(/You Clicked Button 1 Times/i)
    expect(updatedCount).toBeInTheDocument();


});

test("Checking Button Functionality",async()=>{
    render(<Counter/>);
    expect(screen.getByText(/Count :0/i)).toBeInTheDocument();
    const button=screen.getByRole("button",{name: /Click Me/i});
    await userEvent.click(button)
    expect(screen.getByText(/Count :1/i)).toBeInTheDocument();
})