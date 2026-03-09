import React, { useState, useCallback } from "react";
import HomeScreen from "./screens/HomeScreen";
import ProjectTypeScreen from "./screens/ProjectTypeScreen";
import RoomSelectScreen from "./screens/RoomSelectScreen";
import DimensionsScreen from "./screens/DimensionsScreen";
import WizardScreen from "./screens/WizardScreen";
import FloorPlanScreen from "./screens/FloorPlanScreen";
import BudgetScreen from "./screens/BudgetScreen";

const INITIAL_PROJECT = {
  type: null,
  room: null,
  length: 0,
  width: 0,
  shower: null,
  sink: null,
  toilet: null,
  floor: null,
  walls: null,
  materialClass: null,
  works: [],
  location: null,
};

const SCREENS = {
  HOME: "home",
  PROJECT_TYPE: "projectType",
  ROOM_SELECT: "roomSelect",
  DIMENSIONS: "dimensions",
  WIZARD: "wizard",
  FLOOR_PLAN: "floorPlan",
  BUDGET: "budget",
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [project, setProject] = useState({ ...INITIAL_PROJECT });

  const goTo = useCallback((s) => setScreen(s), []);

  switch (screen) {
    case SCREENS.HOME:
      return <HomeScreen onNext={() => goTo(SCREENS.PROJECT_TYPE)} />;

    case SCREENS.PROJECT_TYPE:
      return (
        <ProjectTypeScreen
          onSelect={(type) => {
            setProject((p) => ({ ...p, type }));
            goTo(SCREENS.ROOM_SELECT);
          }}
          onBack={() => goTo(SCREENS.HOME)}
        />
      );

    case SCREENS.ROOM_SELECT:
      return (
        <RoomSelectScreen
          onSelect={(room) => {
            setProject((p) => ({ ...p, room }));
            goTo(SCREENS.DIMENSIONS);
          }}
          onBack={() => goTo(SCREENS.PROJECT_TYPE)}
        />
      );

    case SCREENS.DIMENSIONS:
      return (
        <DimensionsScreen
          onNext={(length, width) => {
            setProject((p) => ({ ...p, length, width }));
            goTo(SCREENS.WIZARD);
          }}
          onBack={() => goTo(SCREENS.ROOM_SELECT)}
        />
      );

    case SCREENS.WIZARD:
      return (
        <WizardScreen
          project={project}
          setProject={setProject}
          onComplete={() => goTo(SCREENS.FLOOR_PLAN)}
          onBack={() => goTo(SCREENS.DIMENSIONS)}
        />
      );

    case SCREENS.FLOOR_PLAN:
      return (
        <FloorPlanScreen
          project={project}
          onNext={() => goTo(SCREENS.BUDGET)}
          onBack={() => goTo(SCREENS.WIZARD)}
        />
      );

    case SCREENS.BUDGET:
      return (
        <BudgetScreen
          project={project}
          onEdit={() => goTo(SCREENS.WIZARD)}
        />
      );

    default:
      return <HomeScreen onNext={() => goTo(SCREENS.PROJECT_TYPE)} />;
  }
}
