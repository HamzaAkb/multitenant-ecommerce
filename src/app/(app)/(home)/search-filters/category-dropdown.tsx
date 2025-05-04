'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { CategoriesGetManyOutput } from '@/modules/categories/types'
import { SubcategoryMenu } from './subcategory-menu'
import { useDropdownPosition } from './use-dropdown-position'

interface Props {
  category: CategoriesGetManyOutput[1]
  isActive: boolean
  isNavigationHovered: boolean
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { getDropdownPosition } = useDropdownPosition(dropdownRef)

  const onMouseEnter = () => {
    if (category.subcategories.length) {
      setIsOpen(true)
    }
  }

  const onMouseLeave = () => {
    setIsOpen(false)
  }

  const dropdownPosition = getDropdownPosition()

  const toggleDropdown = () => {
    if (category.subcategories?.length) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div
      className='relative'
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={toggleDropdown}
    >
      <div className='relative'>
        <Button
          variant={'elevated'}
          className={cn(
            'h-11 px-4 mr-4 bg-transparent rounded-full hover:bg-white hover:border-primary text-black',
            isActive && !isNavigationHovered && 'bg-white border-primary',
            isOpen && 'bg-white border-primary'
          )}
        >
          <Link href={category.slug == 'all' ? '' : `/${category.slug}`}>
            {category.name}
          </Link>
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              'opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-t-[10px] border-t-transparent border-b-black left-1/2 -translate-x-1/2',
              isOpen && 'opacity-100'
            )}
          />
        )}
      </div>

      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
        position={dropdownPosition}
      />
    </div>
  )
}
