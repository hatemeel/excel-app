import { $dom } from '../../core/DOM';

export function resizeHandler($root, event) {
  const { resize } = event.target.dataset;

  if (resize) {
    const $resizer = $dom(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const resizerWidthCorrection = Math.floor($resizer.getCoords().width / 2);
    const resizerHeightCorrection = Math.floor($resizer.getCoords().height / 2);
    let resizeListener;
    let delta;
    let cells;

    $resizer.class.add('active');

    if (resize === 'column') {
      cells = $root.findAll(`[data-column="${$parent.data.column}"]`);

      resizeListener = ({ pageX }) => {
        delta = Math.floor(pageX - coords.right) + resizerWidthCorrection;
        $resizer.css({ transform: `translateX(${delta}px)` });
      };
    } else if (resize === 'row') {
      resizeListener = ({ pageY }) => {
        delta = Math.floor(pageY - coords.bottom) + resizerHeightCorrection;
        $resizer.css({ transform: `translateY(${delta}px)` });
      };
    }

    document.addEventListener('mousemove', resizeListener);

    document.onmouseup = () => {
      if (resize === 'column') {
        cells.forEach((el) => {
          el.style.width = coords.width + delta + 'px';
        });
      } else if (resize === 'row') {
        $parent.css({ height: coords.height + delta + 'px' });
      }

      $resizer.css({ transform: `unset` });
      $resizer.class.remove('active');

      document.removeEventListener('mousemove', resizeListener);
      document.onmouseup = null;
    };
  }
}
