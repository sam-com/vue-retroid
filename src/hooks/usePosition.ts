import { ref, Ref, watchEffect } from 'vue';

export function usePosition(containerRef: Ref<HTMLElement>) {
	const hasItemsOnLeft = ref<boolean>(false);
	const hasItemsOnRight = ref<boolean>(false);
	const currentIndex = ref<number>(0);
	const scrollStartIndex = ref<number>(0);
	const nextElement = ref<HTMLElement | null>(null);
	const prevElement = ref<HTMLElement | null>(null);

	function isElementVisible(elementIndex: number) {
		const rect = containerRef.value.getBoundingClientRect();
		const childRect = containerRef.value.children[elementIndex].getBoundingClientRect();
		return rect.left <= childRect.left && rect.right >= childRect.right;
	}

	function getPrevElement(): HTMLElement | null {
		const sibling = <HTMLElement>containerRef.value.children[currentIndex.value].previousElementSibling;
		if (sibling instanceof HTMLElement) {
			return sibling;
		}
		return sibling;
	}

	function getNextElement(): HTMLElement | null {
		const sibling = <HTMLElement>containerRef.value.children[currentIndex.value].nextElementSibling;
		if (sibling instanceof HTMLElement) {
			return sibling;
		}
		return null;
	}

	const scrollToElement = (index: number) => {
		const currentNode = containerRef.value;
		const element = <HTMLElement>currentNode.children[index];

		if (!currentNode || !element) return;

		const newScrollPosition =
			element.offsetLeft;

		currentNode.scroll({
			left: newScrollPosition,
			behavior: 'smooth',
		});
	};

	watchEffect(() => {
		prevElement.value = getPrevElement();
		nextElement.value = getNextElement();
		hasItemsOnLeft.value = currentIndex.value > 0;
		hasItemsOnRight.value = currentIndex.value < containerRef.value.children.length - 1;
	}, { flush: 'post' });

	const scrollRight = () => {
		if (currentIndex.value === containerRef.value.children.length - 1) {
			return;
		}
		const newIndex: number = currentIndex.value + 1;

		if (!isElementVisible(newIndex)) {
			scrollToElement(scrollStartIndex.value + 1);
			scrollStartIndex.value += 1;
		}
		currentIndex.value = newIndex;
	};

	const scrollLeft = () => {
		if (currentIndex.value === 0) {
			return;
		}
		const newIndex: number = currentIndex.value - 1;
		if (!isElementVisible(newIndex)) {
			scrollToElement(newIndex);
			scrollStartIndex.value -= 1;
		}
		currentIndex.value = newIndex;
	};

	return {
		scrollRight,
		scrollLeft,
		currentIndex,
	};
}