import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getPins } from '../../api/pins';
import Pin from '../components/pin';

const Feeds = () => {
  const {category = ""} = useParams();
  const [pins, setpins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    const pins = getPins(category).then(pins => {
      setpins(pins);
    }).finally(() => {
      setIsLoading(false);
    });
  },[])


  return (
    <div>
      {isLoading ? "skeleton": pins.length > 0 ? pins.map(pin => <Pin/>):"There is no pin" }
    </div>
  )
}

export default Feeds