import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { library, dom } from '@fortawesome/fontawesome-svg-core';

// ── Solid icons ──────────────────────────────────────────────────────────────
import {
  faArrowUp, faAward, faBars, faBriefcase, faCalendarAlt, faCertificate,
  faChartBar, faChartLine, faCheck, faCheckCircle, faChess, faCircle,
  faCode, faCodeBranch, faCogs, faDatabase, faDownload, faEnvelope,
  faExclamationCircle, faExternalLinkAlt, faEye, faFilePdf, faFire,
  faFlask, faFolderOpen, faGraduationCap, faHeart, faHeartbeat, faHouse,
  faLayerGroup, faLeaf, faLocationDot, faMapMarkerAlt, faMedal,
  faMicrophone, faMoon, faMusic, faPaperPlane, faPenFancy, faPhone,
  faRobot, faRotate, faSearch, faServer, faShoppingBag, faStar, faSun,
  faSyncAlt, faTasks, faTerminal, faTimes, faTrophy, faTools, faUser,
  faUsers, faVideo, faVial
} from '@fortawesome/free-solid-svg-icons';

// ── Brand icons ───────────────────────────────────────────────────────────────
import {
  faAngular, faAws, faDocker, faGitAlt, faGithub, faJava, faJenkins,
  faJira, faJsSquare, faLinkedin, faLinkedinIn, faMicrosoft, faNodeJs,
  faReact, faStackOverflow
} from '@fortawesome/free-brands-svg-icons';

library.add(
  // solid
  faArrowUp, faAward, faBars, faBriefcase, faCalendarAlt, faCertificate,
  faChartBar, faChartLine, faCheck, faCheckCircle, faChess, faCircle,
  faCode, faCodeBranch, faCogs, faDatabase, faDownload, faEnvelope,
  faExclamationCircle, faExternalLinkAlt, faEye, faFilePdf, faFire,
  faFlask, faFolderOpen, faGraduationCap, faHeart, faHeartbeat, faHouse,
  faLayerGroup, faLeaf, faLocationDot, faMapMarkerAlt, faMedal,
  faMicrophone, faMoon, faMusic, faPaperPlane, faPenFancy, faPhone,
  faRobot, faRotate, faSearch, faServer, faShoppingBag, faStar, faSun,
  faSyncAlt, faTasks, faTerminal, faTimes, faTrophy, faTools, faUser,
  faUsers, faVideo, faVial,
  // brands
  faAngular, faAws, faDocker, faGitAlt, faGithub, faJava, faJenkins,
  faJira, faJsSquare, faLinkedin, faLinkedinIn, faMicrosoft, faNodeJs,
  faReact, faStackOverflow
);

dom.watch();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));