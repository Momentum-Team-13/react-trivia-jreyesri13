import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizQuestions from './Questions'

export default function QuizCategories() {

    const [categories, setCategories] = useState([])

    const [selectedCategory, setSelectedCategory] = useState(null)

    const [categoryURL, setCategoryURL] = useState()


    // Calls the trivia api
    useEffect(() => {
        axios
            .get(`https://opentdb.com/api_category.php`)
            .then((res) => {
                console.log(res.data.trivia_categories)
                setCategories(res.data.trivia_categories)
            })
    }, [])


    const handleSelectedCategory = (selectedCat) => {
        console.log(`ID: ${selectedCat.id}, Category: ${selectedCat.name}`)
        setSelectedCategory(selectedCat)
        customURL(selectedCat)
    }


    const customURL = (selectedCategory) => {
        setCategoryURL(`https://opentdb.com/api.php?amount=10&category=${selectedCategory.id}&type=multiple`)
    }


    return (
        <>
            {selectedCategory ? (
                <>
                    <QuizQuestions categoryID = {categoryURL} />
                </>
            ) : (
                <>
                    <h1>Trivia Game</h1>
                    <h2>Pick a Category</h2>
                    {categories.map((category) => (
                        <button className='category-section' onClick={() => handleSelectedCategory(category)}>{category.name}</button>
                    ))}
                </>
            )
            }

        </>
    )
}