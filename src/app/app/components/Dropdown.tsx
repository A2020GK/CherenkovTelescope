"use client";
import "./dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { ReactNode } from "react";

interface DropdownProps {
    title:string;
    children:ReactNode;
}

const Dropdown = ({ title, children }:DropdownProps) => {

    return <>
        <div className="dropdown">
            <div className="dropdown-toggle box"><FontAwesomeIcon icon={faCaretRight} /> {title}</div>
            <div className="dropdown-content">
                {children}
            </div>
        </div>
    </>;
}
export default Dropdown;