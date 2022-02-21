import { FacebookIcon, LineIcon } from 'react-share';
import { FacebookShareButton, LineShareButton } from 'react-share';

function SocialShare(props) {
  const { url, round } = props;

  return (
    <>
      <FacebookShareButton url={url}>
        <FacebookIcon round={round}></FacebookIcon>
      </FacebookShareButton>
      <LineShareButton url={url}>
        <LineIcon round={round}></LineIcon>
      </LineShareButton>
    </>
  );
}
export default SocialShare;
