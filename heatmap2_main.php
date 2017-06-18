			<!-- <h3>Select file:</h3> -->
			<select id="fileSelector" style="visibility: hidden">
				<option value="data/1/distance.json">distance 1</option>
				<option value="data/1/similarity.json" selected>similarity 1</option>
				<option value="data/1/transform.json">transform 1</option>
				<option value="data/1/weighted.json">weighted 1</option>
				<option value="data/2/distance.json">distance 2</option>
				<option value="data/2/similarity.json">similarity 2</option>
				<option value="data/2/transform.json" >transform 2</option>
				<option value="data/2/weighted.json">weighted 2</option>
			</select>

            <h3>Choose books</h3>
            <select id="select" style="margin-bottom: 20px">
                <option value="all"></option>
            </select>
            <select id="select_2" style="margin-bottom: 20px">
                <option value="all"></option>
            </select>
            <button id="button" onclick="changeBook('drawingCanvas')">
                Filter
            </button>