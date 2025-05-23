import { useMemo } from "react";

import { getSettingsWidgetsForSeries } from "metabase/visualizations/lib/settings/visualization";

import { BaseChartSettings } from "../BaseChartSettings";
import { useChartSettingsState } from "../hooks";

import type { QuestionChartSettingsProps } from "./types";

export const QuestionChartSettings = ({
  question,
  widgets: propWidgets,
  series,
  onChange,
  computedSettings,
  initial,
  className,
}: QuestionChartSettingsProps & { className?: string }) => {
  const { chartSettings, handleChangeSettings, transformedSeries } =
    useChartSettingsState({ series, onChange });

  const widgets = useMemo(
    () =>
      propWidgets ||
      getSettingsWidgetsForSeries(
        transformedSeries,
        handleChangeSettings,
        false,
      ),
    [propWidgets, transformedSeries, handleChangeSettings],
  );

  return (
    <BaseChartSettings
      question={question}
      series={series}
      onChange={onChange}
      initial={initial}
      computedSettings={computedSettings}
      chartSettings={chartSettings}
      transformedSeries={transformedSeries}
      widgets={widgets}
      className={className}
      w="100%"
    />
  );
};
