import {BlockUI} from "primereact/blockui";
import { ProgressSpinner } from 'primereact/progressspinner';

const PageLoader = () => {
  return (
    <BlockUI>
      <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
    </BlockUI>
    )
}

export default PageLoader;