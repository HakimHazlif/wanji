import { useState } from "react";
import PropTypes from "prop-types";

const Rating = ({
  maxRating = 5,
  value = 0,
  onChange,
  color = "#ffbf00",
  inactiveColor = "#cdcdcd",
  size = 24,
  readOnly = false,
  precision = 0.1,
  className = "",
}) => {
  const [hoverValue, setHoverValue] = useState(-1);

  const [localValue, setLocalValue] = useState(value);
  const ratingValue = value !== undefined ? value : localValue;

  // const correction = 0;
  const correction = maxRating > 5 && precision >= 0.5 ? 0.4 : 0;

  function handleMouseMove(e, i) {
    if (readOnly) return;

    const star = e.currentTarget;
    const { width, left } = star.getBoundingClientRect();
    const percent = (e.clientX - left) / width + correction;
    console.log({
      width,
      left,
      clientX: e.clientX,
      percent,
    });

    let newValue = i + percent;

    newValue = Math.floor(newValue / precision) * precision;

    if (Math.abs(newValue + precision - (i + percent)) < 0.1)
      newValue += precision;

    newValue = Math.max(0, Math.min(maxRating, newValue));

    // if (onChangeActive) {
    //   onChangeActive(newValue);
    // } else {
    //   setHoverValue(newValue);
    // }

    setHoverValue(newValue);
  }

  function handleMouseEnter(i) {
    if (readOnly) return;
    setHoverValue(i + 1);
  }

  function handleMouseLeave() {
    if (readOnly) return;
    setHoverValue(-1);
  }

  function handleClick(e, i) {
    if (readOnly) return;

    let newValue;

    const star = e.currentTarget;
    const { width, left } = star.getBoundingClientRect();
    const percent = (e.clientX - left) / width + correction;

    newValue = i + percent;

    newValue = Math.floor(newValue / precision) * precision;

    if (Math.abs(newValue + precision - (i + percent)) < 0.1)
      newValue += precision;

    newValue = Math.max(0, Math.min(maxRating, newValue));

    if (onChange) {
      onChange(newValue);
    } else {
      setLocalValue(newValue);
    }
  }

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="flex" onMouseLeave={handleMouseLeave}>
        {Array.from({ length: maxRating }, (_, index) => (
          <Star
            key={index}
            index={index}
            value={ratingValue}
            hoverValue={hoverValue}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={(e) => handleClick(e, index)}
            color={color}
            inactiveColor={inactiveColor}
            size={size}
            readOnly={readOnly}
          />
        ))}
      </div>
    </div>
  );
};

const Star = ({
  index,
  value,
  hoverValue,
  onMouseMove,
  onMouseEnter,
  onClick,
  color,
  inactiveColor,
  size,
  readOnly,
}) => {
  const fillValue = hoverValue >= 0 ? hoverValue : value;

  let percent = 0;

  if (fillValue >= index + 1) percent = 100;
  else if (fillValue > index) {
    percent = (fillValue - index) * 100;
  }

  const starStyle = {
    position: "relative",
    cursor: readOnly ? "default" : "pointer",
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div
      style={starStyle}
      onMouseMove={readOnly ? undefined : onMouseMove}
      onMouseEnter={readOnly ? undefined : onMouseEnter}
      onClick={readOnly ? undefined : onClick}
    >
      <svg
        fill="none"
        stroke={inactiveColor}
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        style={{ position: "absolute" }}
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
          width: `${percent}%`,
        }}
      >
        <svg
          fill={color}
          stroke={color}
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width={size}
          height={size}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </div>
    </div>
  );
};

Rating.propTypes = {
  maxRating: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  color: PropTypes.string,
  inactiveColor: PropTypes.string,
  size: PropTypes.number,
  readOnly: PropTypes.bool,
  precision: PropTypes.number,
  emptyIcon: PropTypes.node,
  filledIcon: PropTypes.node,
  className: PropTypes.string,
  messages: PropTypes.array,
};

export default Rating;
