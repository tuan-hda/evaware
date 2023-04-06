import { Text } from 'react-native'
import classNames from 'classnames'

type Props = Text['props']

const AppText = (props: Props) => {
  return <Text className={classNames('font-app text-body1', props.className)} {...props} />
}

export default AppText
