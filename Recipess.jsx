import axios from 'axios'
import React, { useEffect, useState } from 'react'

const styles = {
  page: {
    backgroundColor: '#f2f0eb',
    minHeight: '100vh',
    padding: '50px 0 70px',
    fontFamily: 'Georgia, serif',
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: '36px',
    padding: '0 16px',
  },
  label: {
    display: 'inline-block',
    fontSize: '0.72rem',
    fontFamily: 'sans-serif',
    fontWeight: '700',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#b5895a',
    marginBottom: '12px',
  },
  heading: {
    fontSize: '2.8rem',
    fontWeight: '700',
    color: '#1c1c1c',
    margin: '0 0 12px',
    letterSpacing: '-0.5px',
  },
  subheading: {
    color: '#999',
    fontSize: '1rem',
    fontFamily: 'sans-serif',
    margin: 0,
    fontWeight: '400',
  },
  dividerLine: {
    width: '48px',
    height: '2px',
    backgroundColor: '#b5895a',
    margin: '18px auto 24px',
    borderRadius: '2px',
  },
  searchWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    padding: '0 16px',
  },
  searchInput: {
    width: '100%',
    maxWidth: '480px',
    padding: '10px 18px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '0.92rem',
    fontFamily: 'sans-serif',
    backgroundColor: '#fff',
    outline: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    color: '#333',
  },
  filterWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '40px',
    padding: '0 16px',
  },
  filterBtn: {
    padding: '6px 16px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    color: '#555',
    fontSize: '0.8rem',
    fontFamily: 'sans-serif',
    cursor: 'pointer',
    fontWeight: '500',
  },
  filterBtnActive: {
    padding: '6px 16px',
    borderRadius: '20px',
    border: '1px solid #b5895a',
    backgroundColor: '#b5895a',
    color: '#fff',
    fontSize: '0.8rem',
    fontFamily: 'sans-serif',
    cursor: 'pointer',
    fontWeight: '600',
  },
  noResult: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    color: '#aaa',
    fontSize: '0.95rem',
    padding: '40px 0',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '14px',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
    marginBottom: '48px',
    border: '1px solid #ece9e2',
  },
  cardTop: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  imgWrapper: {
    width: '300px',
    minWidth: '300px',
    maxHeight: '300px',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  cardInfo: {
    padding: '30px 34px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '14px',
  },
  mealName: {
    fontSize: '1.65rem',
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: '1.3',
    margin: 0,
  },
  metaRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#fdf6ee',
    color: '#8c5e2a',
    padding: '5px 14px',
    borderRadius: '30px',
    fontSize: '0.78rem',
    fontFamily: 'sans-serif',
    fontWeight: '600',
    border: '1px solid #f0dcc0',
  },
  areaBadge: {
    backgroundColor: '#eef2fb',
    color: '#2e4fa3',
    padding: '5px 14px',
    borderRadius: '30px',
    fontSize: '0.78rem',
    fontFamily: 'sans-serif',
    fontWeight: '600',
    border: '1px solid #c9d5f5',
  },
  tagRow: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f7f7f5',
    border: '1px solid #e2e0da',
    color: '#666',
    padding: '3px 10px',
    borderRadius: '4px',
    fontSize: '0.74rem',
    fontFamily: 'sans-serif',
  },
  youtubeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#cc0000',
    color: '#fff',
    padding: '9px 20px',
    borderRadius: '7px',
    textDecoration: 'none',
    fontSize: '0.82rem',
    fontFamily: 'sans-serif',
    fontWeight: '600',
    width: 'fit-content',
    boxShadow: '0 2px 8px rgba(204,0,0,0.25)',
  },
  sectionDivider: {
    borderTop: '1px solid #ece9e2',
    margin: 0,
  },
  cardBottom: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  ingredientsBox: {
    flex: '0 0 280px',
    minWidth: '220px',
    padding: '26px 30px',
    borderRight: '1px solid #ece9e2',
    backgroundColor: '#fdfcfa',
  },
  instructionsBox: {
    flex: 1,
    minWidth: '280px',
    padding: '26px 32px',
  },
  sectionTitle: {
    fontSize: '0.68rem',
    fontWeight: '700',
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
    color: '#b5895a',
    fontFamily: 'sans-serif',
    marginBottom: '16px',
    paddingBottom: '10px',
    borderBottom: '1px solid #ece9e2',
  },
  ingredientItem: {
    fontSize: '0.875rem',
    color: '#333',
    fontFamily: 'sans-serif',
    padding: '7px 0',
    borderBottom: '1px solid #f4f3f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
  },
  ingredientName: {
    color: '#2c2c2c',
    fontWeight: '500',
  },
  measure: {
    color: '#999',
    fontSize: '0.82rem',
    flexShrink: 0,
  },
  instructions: {
    fontSize: '0.9rem',
    color: '#4a4a4a',
    lineHeight: '1.85',
    fontFamily: 'sans-serif',
    margin: 0,
    whiteSpace: 'pre-line',
  },
}

const Recipes = () => {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    const res = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    setRecipes(res.data.meals)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const categories = ['All', ...new Set(recipes.map(r => r.strCategory).filter(Boolean))]

  const filtered = recipes.filter(rec => {
    const matchSearch = rec.strMeal.toLowerCase().includes(search.toLowerCase())
    const matchCategory = activeCategory === 'All' || rec.strCategory === activeCategory
    return matchSearch && matchCategory
  })

  return (
    <div style={styles.page}>

      <div style={styles.headerSection}>
        <span style={styles.label}>World Kitchen</span>
        <h1 style={styles.heading}>Recipes</h1>
        <p style={styles.subheading}>A curated collection of meals from around the world</p>
        <div style={styles.dividerLine}></div>
      </div>

      <div style={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search a recipe..."
          style={styles.searchInput}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div style={styles.filterWrapper}>
        {categories.map((cat, i) => (
          <button
            key={i}
            style={activeCategory === cat ? styles.filterBtnActive : styles.filterBtn}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="container">
        {loading && (
          <p style={styles.noResult}>Loading recipes...</p>
        )}

        {!loading && filtered.length === 0 && (
          <p style={styles.noResult}>No recipes found for "{search}"</p>
        )}

        {filtered.map((rec, i) => {
          const ingredients = [...Array(20)]
            .map((_, idx) => ({
              name: rec[`strIngredient${idx + 1}`],
              measure: rec[`strMeasure${idx + 1}`],
            }))
            .filter(item => item.name && item.name.trim() !== '')

          const tags = rec.strTags ? rec.strTags.split(',').map(t => t.trim()).filter(Boolean) : []

          return (
            <div key={i} style={styles.card}>

              <div style={styles.cardTop}>
                <div style={styles.imgWrapper}>
                  <img src={rec.strMealThumb} alt={rec.strMeal} style={styles.img} />
                </div>

                <div style={styles.cardInfo}>
                  <h2 style={styles.mealName}>{rec.strMeal}</h2>

                  <div style={styles.metaRow}>
                    {rec.strCategory && <span style={styles.badge}><i className="fa-solid fa-utensils" style={{ marginRight: '5px', fontSize: '0.7rem' }}></i>{rec.strCategory}</span>}
                    {rec.strArea && <span style={styles.areaBadge}><i className="fa-solid fa-earth-asia" style={{ marginRight: '5px', fontSize: '0.7rem' }}></i>{rec.strArea} Cuisine</span>}
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
                      <i className="fa-brands fa-youtube"></i> Watch Recipe Video
                    </a>
                  )}
                </div>
              </div>

              <div style={styles.sectionDivider} />

              <div style={styles.cardBottom}>
                <div style={styles.ingredientsBox}>
                  <div style={styles.sectionTitle}>Ingredients</div>
                  {ingredients.map((item, idx) => (
                    <div key={idx} style={styles.ingredientItem}>
                      <span style={styles.ingredientName}>{item.name}</span>
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
