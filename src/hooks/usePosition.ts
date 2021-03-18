import { ref, Ref, watchEffect } from 'vue';

const activeClass = 'carousel-active';

export function usePosition(containerRef: Ref<HTMLElement>) {
	const hasItemsOnLeft = ref<boolean>(false);
	const hasItemsOnRight = ref<boolean>(false);
	const currentIndex = ref<number>(0);
	const nextElement = ref<HTMLElement | null>(null);
	const prevElement = ref<HTMLElement | null>(null);

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

	const scrollToElement = (element: HTMLElement | null) => {
		const currentNode = containerRef.value;

		if (!currentNode || !element) return;

		const newScrollPosition = element.offsetLeft +
			element.getBoundingClientRect().width / 2 -
			currentNode.getBoundingClientRect().width / 2;

		const currentElement = currentNode.children[currentIndex.value];
		currentElement.classList.remove(activeClass);
		element.classList.add(activeClass);

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

	watchEffect(() => {
		containerRef.value.children[currentIndex.value].classList.add(activeClass);
	}, { flush: 'post' });

	const scrollRight = () => {
		if (currentIndex.value === containerRef.value.children.length - 1) {
			return;
		}
		const newIndex: number = currentIndex.value + 1;

		scrollToElement(getNextElement());
		currentIndex.value = newIndex;
	};

	const scrollLeft = () => {
		if (currentIndex.value === 0) {
			return;
		}
		const newIndex: number = currentIndex.value - 1;
		scrollToElement(getPrevElement());
		currentIndex.value = newIndex;
	};

	return {
		scrollRight,
		scrollLeft,
		hasItemsOnLeft,
		hasItemsOnRight,
		currentIndex,
	};
}