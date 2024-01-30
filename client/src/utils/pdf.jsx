// Core viewer
import { Viewer } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance
const defaultLayoutPluginInstance = defaultLayoutPlugin();

<Viewer
fileUrl='https://drive.google.com/uc?id=1vmiWI3NUHORkl-g7D9WA8Xh7YbTOHfmB'
plugins={[
    // Register plugins
    defaultLayoutPluginInstance,
    ...
]}
/>