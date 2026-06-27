import axios from 'axios'
import React, { useEffect, useState } from 'react'

const styles = {
  page: {
    backgroundColor: '#f5f5f0',
    minHeight: '100vh',
    padding: '30px 0',
    fontFamily: 'Georgia, serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.2rem',
    marginBottom: '10px',
    color: '#2c2c2c',
    letterSpacing: '1px',
  },
  subheading: {
    textAlign: 'center',
    color: '#888',
    fontSize: '0.95rem',
    marginBottom: '40px',
    fontFamily: 'sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    marginBottom: '36px',
  },
  cardTop: {
    display: 'flex',
    gap: '0',
    flexWrap: 'wrap',
  },
  imgWrapper: {
    width: '260px',
    minWidth: '260px',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  cardInfo: {
    padding: '24px 28px',
    flex: 1,
  },
  mealName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  metaRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '14px',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#f0ebe3',
    color: '#7a5c3a',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontFamily: 'sans-serif',
    fontWeight: '600',
  },
  areaBadge: {
    backgroundColor: '#e8f0fe',
    color: '#3a5ca8',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontFamily: 'sans-serif',
    fontWeight: '600',
  },
  tagRow: {
    display: 'flex',
    gap: '7px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  tag: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    color: '#555',
    padding: '3px 10px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontFamily: 'sans-serif',
  },
  youtubeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    backgroundColor: '#ff0000',
    color: '#fff',
    padding: '7px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontFamily: 'sans-serif',
    fontWeight: '600',
    marginTop: '4px',
  },
  divider: {
    borderTop: '1px solid #f0f0f0',
    margin: '0',
  },
  cardBottom: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  ingredientsBox: {
    flex: 1,
    minWidth: '220px',
    padding: '22px 28px',
    borderRight: '1px solid #f0f0f0',
  },
  instructionsBox: {
    flex: 2,
    minWidth: '280px',
    padding: '22px 28px',
  },
  sectionTitle: {
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: '#aaa',
    fontFamily: 'sans-serif',
    marginBottom: '12px',
  },
  ingredientItem: {
    fontSize: '0.9rem',
    color: '#333',
    fontFamily: 'sans-serif',
    padding: '4px 0',
    borderBottom: '1px solid #f7f7f7',
    display: 'flex',
    justifyContent: 'space-between',
  },
  measure: {
    color: '#888',
    fontSize: '0.85rem',
  },
  instructions: {
    fontSize: '0.9rem',
    color: '#444',
    lineHeight: '1.75',
    fontFamily: 'sans-serif',
  },
}

const Recipes = () => {
  const [recipes, setRecipes] = useState([])

  async function fetchData() {
    const res = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    setRecipes(res.data.meals)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Recipes</h1>
      <p style={styles.subheading}>A collection of meals from around the world</p>

      <div className="container">
        {recipes.map((rec, i) => {
          const ingredients = [...Array(20)]
            .map((_, idx) => ({
              name: rec[`strIngredient${idx + 1}`],
              measure: rec[`strMeasure${idx + 1}`],
            }))
            .filter(item => item.name && item.name.trim() !== '')

          const tags = rec.strTags ? rec.strTags.split(',').map(t => t.trim()) : []

          return (
            <div key={i} style={styles.card}>

              <div style={styles.cardTop}>
                <div style={styles.imgWrapper}>
                  <img src={rec.strMealThumb} alt={rec.strMeal} style={styles.img} />
                </div>

                <div style={styles.cardInfo}>
                  <div style={styles.mealName}>{rec.strMeal}</div>

                  <div style={styles.metaRow}>
                    {rec.strCategory && <span style={styles.badge}>{rec.strCategory}</span>}
                    {rec.strArea && <span style={styles.areaBadge}>{rec.strArea} Cuisine</span>}
                  </div>

                  {tags.length > 0 && (
                    <div style={styles.tagRow}>
                      {tags.map((tag, ti) => (
                        <span key={ti} style={styles.tag}># {tag}</span>
                      ))}
                    </div>
                  )}

                  {rec.strYoutube && (
                    <a href={rec.strYoutube} target="_blank" rel="noreferrer" style={styles.youtubeBtn}>
                      <i className="fa-brands fa-youtube"></i> Watch on YouTube
                    </a>
                  )}
                </div>
              </div>

              <div style={styles.divider} />

              <div style={styles.cardBottom}>
                <div style={styles.ingredientsBox}>
                  <div style={styles.sectionTitle}>Ingredients</div>
                  {ingredients.map((item, idx) => (
                    <div key={idx} style={styles.ingredientItem}>
                      <span>{item.name}</span>
                      <span style={styles.measure}>{item.measure}</span>
                    </div>
                  ))}
                </div>

                <div style={styles.instructionsBox}>
                  <div style={styles.sectionTitle}>Instructions</div>
                  <p style={styles.instructions}>{rec.strInstructions}</p>
                </div>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Recipes