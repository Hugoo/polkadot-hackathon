# FRAME Development

- Link: https://gitcoin.co/issue/Polkadot-Network/hello-world-by-polkadot/7/100023933
- Status: Submitted ✅

# Result

Structure:

```rust
pub struct CovidTestResults {
	id: u32
	is_positive: bool,
}
```

![front](./front.png "front")

# Resources

- https://substrate.dev/recipes/structs.html
- https://substrate.dev/docs/en/knowledgebase/runtime/storage#declaring-storage-items

## Notes

- Node template cloned from the [substrate-node-template](https://github.com/substrate-developer-hub/substrate-node-template) `v2.0.0` repository (commit hash: [`24da7670a9a73fd6d868cfff105e2fd1f9be6f67`](https://github.com/substrate-developer-hub/substrate-node-template/commit/24da7670a9a73fd6d868cfff105e2fd1f9be6f67))
- Frontend template cloned from the [substrate-front-end-template](https://github.com/substrate-developer-hub/substrate-front-end-template) repository (commit hash: [`accd5ea1c5cebaae3e513fb622c34ca356b9c820`](https://github.com/substrate-developer-hub/substrate-front-end-template/commit/accd5ea1c5cebaae3e513fb622c34ca356b9c820))
