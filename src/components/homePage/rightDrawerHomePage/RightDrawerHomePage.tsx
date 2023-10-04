import { Drawer } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { setRightDrawerVisible } from '../../../redux/slices/homepage/homepage.slice'

const RightDrawerHomePage = () => {
  const dispatch = useAppDispatch()
  const rightDrawerVisible = useAppSelector(state => state.home.rightDrawerVisible)

  const onClickOutside = () => {
    dispatch(setRightDrawerVisible(!rightDrawerVisible))
  }

  return (
    <div>
      <Drawer
        anchor={'right'}
        open={rightDrawerVisible}
        onClose={onClickOutside}
      >
      </Drawer>
    </div>
  )
}

export default RightDrawerHomePage