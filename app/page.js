'use client'

import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import SearchFilters from '../components/SearchFilters'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // UI state
