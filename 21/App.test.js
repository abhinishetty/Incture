import { render,screen } from "@testing-library/react";
import App from "./App";

test("render App Component",()=>{
render(<App/>);    //fake rendering
const headingElement=screen.getByText(/React With Testing/i);
expect(headingElement).toBeInTheDocument();



})