import {Chip} from '@nextui-org/react'


const CategoryChip=({category}: {category:string})=>{

    return <>
    <div className='flex flex-row gap-4 mb-2'>
    <label>
      <Chip
        color="secondary"
        variant="dot"
      >
        {category}
      </Chip>
    </label>
        </div>
    </>
}

export default CategoryChip;