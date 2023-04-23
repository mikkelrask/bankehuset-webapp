import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ClearDay } from '../../icons/icon01d.svg';
import { ReactComponent as FewCloudsDay } from '../../icons/icon02d.svg';
import { ReactComponent as ScatteredCloudsDay } from '../../icons/icon03d.svg';
import { ReactComponent as BrokenCloudsDay } from '../../icons/icon04d.svg';
import { ReactComponent as ShowerRainDay } from '../../icons/icon09d.svg';
import { ReactComponent as RainDay } from '../../icons/icon10d.svg';
import { ReactComponent as ThunderstormDay } from '../../icons/icon11d.svg';
import { ReactComponent as SnowDay } from '../../icons/icon13d.svg';

const icons = {
  '01d': ClearDay,
  '02d': FewCloudsDay,
  '03d': ScatteredCloudsDay,
  '04d': BrokenCloudsDay,
  '09d': ShowerRainDay,
  '10d': RainDay,
  '11d': ThunderstormDay,
  '13d': SnowDay,
};

const WeatherIcon = ({ iconName, className, ...props }) => {
  const IconComponent = icons[iconName];
  return (
    <div className={className}>
      <IconComponent {...props} />
    </div>
  );
};

WeatherIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default WeatherIcon;
