
const visited = new Set()

function printDeps(root) {
    if (visited.has(root)) return;
    visited.add(root);
    for (const dep of root.deps ?? []) {
        printDeps(dep);
    }
    console.log(root.name);
}

function printNodes(root) {
    printDeps(root);
    for (const child of root.children ?? []) {
        printNodes(child)
    }
}

const child1 = {
    name: "child1"
}

const child3 = {
    name: "child3"
}

const child2 = {
    name: "child2",
    children: [child3]
}

const root = {
    name: "root",
    children: [child1, child2]
}
child1.deps = [child2]
child3.deps = [child1]

printNodes(root)


