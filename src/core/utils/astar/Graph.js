/**
 * Created by Virtue on 2018/1/18.
 */
function Graph(gridIn, options) {
    options = options || {};
    this.nodes = [];
    this.diagonal = !!options.diagonal;
    this.grid = [];
    for (var x = 0; x < gridIn.length; x++) {
        this.grid[x] = [];

        for (var y = 0, row = gridIn[x]; y < row.length; y++) {
            var node = new GridNode(x, y, row[y]);
            this.grid[x][y] = node;
            this.nodes.push(node);
        }
    }
    this.init();
}

Graph.prototype.init = function() {
    this.dirtyNodes = [];
    for (var i = 0; i < this.nodes.length; i++) {
        astar.cleanNode(this.nodes[i]);
    }
};

Graph.prototype.cleanDirty = function() {
    for (var i = 0; i < this.dirtyNodes.length; i++) {
        astar.cleanNode(this.dirtyNodes[i]);
    }
    this.dirtyNodes = [];
};

Graph.prototype.markDirty = function(node) {
    this.dirtyNodes.push(node);
};

Graph.prototype.neighbors = function(node) {
    var ret = [];
    var x = node.x;
    var y = node.y;
    var grid = this.grid;

    // 西
    if (grid[x - 1] && grid[x - 1][y]) {
        ret.push(grid[x - 1][y]);
    }

    // 东
    if (grid[x + 1] && grid[x + 1][y]) {
        ret.push(grid[x + 1][y]);
    }

    // 南
    if (grid[x] && grid[x][y - 1]) {
        ret.push(grid[x][y - 1]);
    }

    // 北
    if (grid[x] && grid[x][y + 1]) {
        ret.push(grid[x][y + 1]);
    }

    if (this.diagonal) {
        // 西南
        if (grid[x - 1] && grid[x - 1][y - 1]) {
            ret.push(grid[x - 1][y - 1]);
        }

        // 东南
        if (grid[x + 1] && grid[x + 1][y - 1]) {
            ret.push(grid[x + 1][y - 1]);
        }

        // 西北
        if (grid[x - 1] && grid[x - 1][y + 1]) {
            ret.push(grid[x - 1][y + 1]);
        }

        // 东北
        if (grid[x + 1] && grid[x + 1][y + 1]) {
            ret.push(grid[x + 1][y + 1]);
        }
    }

    return ret;
};

Graph.prototype.updateWeight = function (row,col,weight)
{
    if(this.grid[row][col])
        this.grid[row][col].weight = weight;
};

Graph.prototype.toString = function() {
    var graphString = [];
    var nodes = this.grid;
    for (var x = 0; x < nodes.length; x++) {
        var rowDebug = [];
        var row = nodes[x];
        for (var y = 0; y < row.length; y++) {
            rowDebug.push(row[y].weight);
        }
        graphString.push(rowDebug.join(" "));
    }
    return graphString.join("\n");
};