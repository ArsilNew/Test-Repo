import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { List } from "react-virtualized/dist/commonjs/List";

import styles from "./list.scss";
import Item from "../items/item";
import NoItems from "../items/no_items";

class InnerList extends PureComponent {
  static propTypes = {
    renderer: PropTypes.any,
    noItemsRenderer: PropTypes.any,
    itemHeight: PropTypes.number,
    height: PropTypes.number,
    offset: PropTypes.number,
    onClick: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.number),
    items: PropTypes.array,
    disabled: PropTypes.bool,
    disabledItemsTooltip: PropTypes.string
  };

  static defaultProps = {
    renderer: Item,
    noItemsRenderer: NoItems,
    itemHeight: 40,
    height: 400,
    offset: 0,
    selectedIds: [],
    items: [],
    disabled: false
  };

  constructor(props) {
    super(props);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.noRowsRenderer = this.noRowsRenderer.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event, item) {
    const { disabled, onClick, selectedIds } = this.props;
    const checked = selectedIds.includes(item.id);
    if (((disabled || item.disabled) && checked) || (!disabled && item.disabled !== true)) {
      onClick(event, item.id);
    }
  }

  rowRenderer({ index, isScrolling, key, style }) {
    const {
      renderer,
      itemHeight,
      onClick,
      items,
      selectedIds,
      disabled,
      disabledItemsTooltip
    } = this.props;
    const Renderer = renderer;
    const item = items[index];
    const checked = selectedIds.includes(item.id);
    return (
      <div
        key={key}
        style={style}
        className={styles.list_item}
        onClick={event => this.onClick(event, item)}
        title={disabled ? disabledItemsTooltip : undefined}
      >
        <Renderer
          item={item}
          height={itemHeight}
          checked={checked}
          disabled={(disabled || item.disabled === true) && !checked}
        />
      </div>
    );
  }

  noRowsRenderer() {
    const { noItemsMessage, noItemsRenderer } = this.props;
    const NoItemsRenderer = noItemsRenderer;
    return <NoItemsRenderer noItemsMessage={noItemsMessage} />;
  }

  render() {
    const { height, itemHeight, items, offset, width, getlistRef } = this.props;
    return (
      <List
        ref={getlistRef}
        className={styles.list}
        rowRenderer={this.rowRenderer}
        noRowsRenderer={this.noRowsRenderer}
        width={width - offset}
        rowHeight={itemHeight}
        height={height}
        rowCount={items.length}
      />
    );
  }
}

export default InnerList;
