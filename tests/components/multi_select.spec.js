import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { MultiSelect } from "../../src/components/multi_select";

const CustomComponent = jest
  .fn(() => <div>Custom Component</div>)
  .mockName("mockedComponent");

const custom_messages = {
  searchPlaceholder: "Find...",
  noItemsMessage: "No entries available...",
  noneSelectedMessage: "Nothing",
  selectedMessage: "Checked",
  selectAllMessage: "Check all",
  clearAllMessage: "Uncheck all"
};

const selectAllItems = jest.fn().mockName("selectAllItems");
const filterItems = jest.fn().mockName("filterItems");
const selectItem = jest.fn().mockName("selectItem");
const unselectItem = jest.fn().mockName("unselectItem");
const clearAll = jest.fn().mockName("clearAll");

describe("MultiSelect", () => {
  test("default snapshot", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect />);
    expect(tree).toMatchSnapshot();
  });

  test("custom selectAllRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect selectAllRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom searchRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect searchRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom noItemsRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect noItemsRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom itemRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect itemRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom messages", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect messages={custom_messages} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedIds", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect selectedIds={[1, 2]} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedItems", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect selectedItems={[1, 2]} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectAllItems", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect selectAllItems={selectAllItems} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("passed filterItems", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect selectAllItems={filterItems} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectItem", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect selectAllItems={selectItem} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed unselectItem", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect unselectItem={unselectItem} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed clearAll", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect clearAll={clearAll} />);
    expect(tree).toMatchSnapshot();
  });

  test("can remove select all", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect showSelectAll={false} />);
    expect(tree).toMatchSnapshot();
  });

  test("can remove search", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect showSearch={false} />);
    expect(tree).toMatchSnapshot();
  });

  test("displays Loader when loading", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect loading={true} />);
    expect(tree).toMatchSnapshot();
  });

  test("displays custom Loader when loading", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect loading={true} loaderRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });
});