import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Next } from './assets/chevronDown.svg';
import { ReactComponent as Prev } from './assets/chevronUp.svg';

import './styles.css';

const VerticalCarousel = ({ data, leadingText }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // #1 above. Used to determine which items appear above the active item
  const halfwayIndex = Math.ceil(data.length / 2);

  // #2 above. Used to determine the height/spacing of each item
  const itemHeight = 52;

  // #3 above. Used to determine at what point an item is moved from the top to the bottom
  const shuffleThreshold = halfwayIndex * itemHeight;

  // #4 above. Used to determine which items should be visible. Prevents "ghost" transitions
  const visibleStyleThreshold = shuffleThreshold / 2;

  const determinePlacement = (itemIndex) => {
    // Position item in the center of list
    if (activeIndex === itemIndex) return 0;

    // Targeting items in the second part of the list
    if (itemIndex >= halfwayIndex) {
      // If moving backwards from index 0 to the last item, move the value downwards
      if (activeIndex > itemIndex - halfwayIndex) {
        return (itemIndex - activeIndex) * itemHeight;
      } else {
        // Negative value moves upwards towards the top of the list
        return -(data.length + activeIndex - itemIndex) * itemHeight;
      }
    }

    // Spacing for items after the current index
    if (itemIndex > activeIndex) {
      return (itemIndex - activeIndex) * itemHeight;
    }

    // Spacing for items before the current index
    if (itemIndex < activeIndex) {
      // If passing the negative threshold, move into a positive positioning
      if ((activeIndex - itemIndex) * itemHeight >= shuffleThreshold) {
        return (data.length - (activeIndex - itemIndex)) * itemHeight;
      }
      // Move into a negative positioning
      return -(activeIndex - itemIndex) * itemHeight;
    }
  };

  const handleClick = (direction) => {
    setActiveIndex((prevIndex) => {
      if (direction === 'prev') {
        if (prevIndex === 0) {
          return data.length - 1;
        }
        return prevIndex - 1;
      }
      if (direction === 'next') {
        if (prevIndex === data.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      }

      return prevIndex;
    });
  };

  return (
    <section className="outer-container">
      <div className="carousel-wrapper">
        <button
          type="button"
          className="carousel-button prev"
          onClick={() => handleClick('prev')}
        >
          <Prev />
        </button>

        <div className="carousel">
          <div className="leading-text">
            <p>{leadingText}</p>
          </div>
          <div className="slides">
            <div className="carousel-inner">
              {data.map((item, i) => (
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={cn('carousel-item', {
                    active: activeIndex === i,
                    visible:
                      Math.abs(determinePlacement(i)) <= visibleStyleThreshold,
                  })}
                  key={item.id}
                  style={{
                    transform: `translateY(${determinePlacement(i)}px)`,
                  }}
                >
                  {item.introline}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="carousel-button next"
          onClick={() => handleClick('next')}
        >
          <Next />
        </button>
      </div>
      <div className="content">
        <img
          src={data[activeIndex].content.image}
          alt={data[activeIndex].content.introline}
        />
        <p>{data[activeIndex].content.copy}</p>
      </div>
    </section>
  );
};

VerticalCarousel.propTypes = {
  data: PropTypes.array.isRequired,
  leadingText: PropTypes.string.isRequired,
};

export default VerticalCarousel;
