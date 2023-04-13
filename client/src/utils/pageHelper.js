import { useState } from "react";

export const SearchValue = () =>{
    const [searchValueKey,setSearchValueKey] = useState('');
    return(searchValueKey);
}
