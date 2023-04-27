import axios from "axios";
import { useState } from "react";

var prodId = 0;
export const SearchValue = () =>{
    const [searchValueKey,setSearchValueKey] = useState('');
    return(searchValueKey);
}

export const setProdIdGlobal = (id) =>{
    prodId = id;
    console.log("prod id in pagehelper",prodId);
}

export const getProdIdGlobal = () =>{
    return prodId;
}

export const getProductCategories = () =>{
    var result;
    try {
        axios.get("https://localhost:7258/api/Category").then((res) => {
          console.log("categories from pagehelper", res.data);
          result = res.data;
        });
    } 
    catch (error) {
        console.log("error while fetching categories pagehelper", error);
    }
    return result;
}